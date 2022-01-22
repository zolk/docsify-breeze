import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';
import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  appIndex: 'docs/index.html',
  open: '/',
  nodeResolve: true,
  middleware: [
    function rewriteIndex(context, next) {
      const url = context.url;

      if (
        !url.startsWith('/__') &&
        !url.startsWith('/src') &&
        !url.startsWith('/dist') &&
        !url.startsWith('/node_modules')
      ) {
        context.url = '/docs' + context.url;
      }

      return next();
    },
  ],
  plugins: [
    esbuildPlugin({ ts: true }),
    hmrPlugin({
      include: ['src/**/*'],
      presets: [presets.lit],
    }),
  ],
};
