import fs from 'fs';
import path from 'path';
import { globby } from 'globby';

(async () => {
  let urls = [];

  const components = await globby('./docs/components/*.md');

  function getSlugs(markdown) {
    let slugs = [];
    const lines = markdown.split('\n');

    lines.map((line) => {
      if (line.startsWith('```html preview')) {
        const slug = line.match(/\b(\w+)$/g);
        slugs.push(slug);
      }
    });

    return slugs;
  }

  components.map((file) => {
    const content = fs.readFileSync(file, 'utf8');
    const slugs = getSlugs(content);
    const filename = path.basename(file, '.md');

    slugs.map((slug) => {
      const url = `http://localhost:3000/components/${filename}?example=${slug}`;
      urls.push({ name: `${filename}/${slug}`, url: url });
    });
  });

  return urls.map((url) => ({ name: url.name, url: url.url }));
})();
