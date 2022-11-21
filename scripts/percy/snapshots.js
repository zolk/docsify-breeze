const fs = require("fs");
const path = require("path");

module.exports = async () => {
  let snapshots = [];

  const { globby } = await import("globby");
  const components = await globby("./docs/components/*.md");

  function getSlugs(markdown) {
    let slugs = [];
    const lines = markdown.split("\n");

    lines.map((line) => {
      if (line.startsWith("```html preview")) {
        const slug = line.match(/\b([a-zA-Z_-]+)$/g);
        slugs.push(slug);
      }
    });

    return slugs;
  }

  components.map((file) => {
    const content = fs.readFileSync(file, "utf8");
    const slugs = getSlugs(content);
    const filename = path.basename(file, ".md");

    slugs.map((slug) => {
      const url = `http://localhost:3000/components/${filename}?preview=${slug}`;
      snapshots.push({ name: `${filename}/${slug}`, url: url });
    });
  });

  return snapshots.map((snapshot) => ({
    name: snapshot.name,
    url: snapshot.url,
  }));
};
