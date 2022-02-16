import commandLineArgs from 'command-line-args';
import esbuild from 'esbuild';
import glob from 'fast-glob';

const { watch } = commandLineArgs([{ name: 'watch', type: Boolean }]);

(async () => {
  console.log('🗜 Minifying custom Docsify plugins...');

  await esbuild
    .build({
      format: 'esm',
      target: 'es2017',
      entryPoints: [...(await glob('./docs/assets/plugins/*.js'))],
      outdir: './docs/assets/plugins/minified',
      bundle: false,
      minify: true,
      watch: {
        onRebuild(err) {
          if (err) console.error('🚨 Build failure:', err);
          else console.log('✅ Rebuild complete.');
        },
      },
    })
    .catch((err) => {
      console.error('🚨 Build failure:', err);
      process.exit(1);
    })
    .then((result) => {
      console.log('📦 Plugins have been successfully built!');
      if (!watch) result.stop();
    });
})();
