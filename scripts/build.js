import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import commandLineArgs from 'command-line-args';
import cssnano from 'cssnano';
import del from 'del';
import esbuild from 'esbuild';
import nested from 'postcss-nested';
import postCss from './plugins/esbuild-plugin-postcss.js';
import { globby } from 'globby';
import mkdirp from 'mkdirp';
import postCssSyntax from '@stylelint/postcss-css-in-js';
import { execSync } from 'child_process';

const bs = browserSync.create();

const { serve } = commandLineArgs([{ name: 'serve', type: Boolean }]);

const outdir = './dist';

const generateCem = () => {
  console.log('Generating component metadata manifest...');
  execSync(`cem analyze --outdir "${outdir}"`, { stdio: 'inherit' });
};

del.sync(outdir);
mkdirp.sync(outdir);

(async () => {
  try {
    if (!serve) {
      console.log('Generating type definitions...');
      execSync('tsc --emitDeclarationOnly', { stdio: 'inherit' });
    }
    generateCem();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('Compiling code...');

  await esbuild
    .build({
      format: 'esm',
      target: 'es2017',
      entryPoints: [
        // Main Entry Point
        './src/index.ts',
        // Individual Components
        ...(await globby('./src/components/**/!(*.(styles|test)).ts')),
        // Global Styles
        ...(await globby('./src/styles/*.css')),
      ],
      outdir,
      chunkNames: 'chunks/[name].[hash]',
      incremental: serve,
      bundle: true,
      splitting: true,
      minify: serve,
      external: serve ? [] : ['lit'],
      plugins: [
        postCss({
          filter: /\.ts/,
          config: {
            syntax: postCssSyntax,
            plugins: [
              autoprefixer,
              nested,
              cssnano({
                preset: 'cssnano-preset-lite',
              }),
            ],
          },
        }),
      ],
      watch: {
        onRebuild(err) {
          if (err) console.error('🚨 Build failure:', err);
          else generateCem();
          console.log('✅ Rebuild complete.');
        },
      },
    })
    .catch((err) => {
      console.error('🚨 Build failure:', err);
      process.exit(1);
    })
    .then((result) => {
      console.log('🎉 Project has been successfully built!');
      if (!serve) result.stop();
    });

  if (serve) {
    bs.init({
      single: true,
      notify: false,
      ghostMode: false,
      logPrefix: 'Dev Server',
      server: {
        baseDir: 'docs',
        routes: {
          '/dist': './dist',
        },
      },
    });

    bs.watch(['docs/**/*.md', 'dist/**/*.js']).on('change', () => {
      bs.reload();
    });
  }
})();
