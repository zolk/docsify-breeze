import esbuild from 'esbuild';
import postcss from 'postcss';
import fs from 'fs';
import path from 'path';

const postCss = (settings = {}) => ({
  name: 'postcss',
  setup(build) {
    const { filter = /.*/, config = {} } = settings;

    const parse = (file) => {
      const result = esbuild.transformSync(file, {
        loader: 'ts',
      });

      return result.code;
    };

    const transformContents = async ({ args, file }) => {
      const from = path.resolve(args.path);
      const plugins = config.plugins || [];

      const parsedFile = parse(file);

      return postcss([...plugins])
        .process(parsedFile, {
          from,
          ...config,
        })
        .then((result) => {
          const css = result.css;
          return css;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    build.onLoad({ filter }, async (args) => {
      const file = await fs.promises.readFile(args.path, 'utf8');

      try {
        const contents = await transformContents({ args, file });
        return { contents: contents, loader: 'js' };
      } catch (err) {
        console.log(err);
      }
    });
  },
});

export default postCss;
