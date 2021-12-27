import autoprefixer from 'autoprefixer';
import commandLineArgs from 'command-line-args';
import csswring from 'csswring';
import del from 'del';
import esbuild from 'esbuild';
import nested from 'postcss-nested';
import postCss from './plugins/esbuild-plugin-postcss.js';
import glob from 'fast-glob';
import mkdirp from 'mkdirp';
import postCssSyntax from '@stylelint/postcss-css-in-js';
import { execSync } from 'child_process';

const options = commandLineArgs(
  [
    { name: 'watch', type: Boolean },
    { name: 'no-splitting', type: Boolean },
  ],
  { camelCase: true }
);

const outdir = './dist';

del.sync(outdir);
mkdirp.sync(outdir);

(async () => {
  try {
    if (!options.watch) {
      console.log('Generating type definitions...');
      execSync('tsc --emitDeclarationOnly', { stdio: 'inherit' });
      console.log('Generating component metadata manifest...');
      execSync(`cem analyze --outdir "${outdir}"`, { stdio: 'inherit' });
    }
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
        ...(await glob('./src/components/**/!(*.(styles|test)).ts')),
        // Themes
        ...(await glob('./src/themes/*.css')),
      ],
      outdir,
      chunkNames: 'chunks/[name].[hash]',
      incremental: options.watch,
      bundle: true,
      splitting: !options.noSplitting,
      minify: !options.watch,
      external: ['lit'],
      plugins: [
        postCss({
          filter: /\.ts/,
          config: {
            syntax: postCssSyntax,
            plugins: [autoprefixer, nested, csswring],
          },
        }),
      ],
      watch: {
        onRebuild(err) {
          if (err) console.error('🚨 Build failure:', err);
          else console.log('✅ Rebuild complete.\n');
        },
      },
    })
    .catch((err) => {
      console.error('🚨 Build failure:', err);
      process.exit(1);
    })
    .then((result) => {
      console.log('🎉 Project has been successfully built!\n');
      if (!options.watch) result.stop();
    });

  if (options.watch) console.log('🔍 Watching for changes...\n');
})();
