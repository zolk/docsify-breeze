window.$docsify.plugins.push((hook) => {
  hook.beforeEach(async function (content, next) {
    // Page Headline
    content = content.replace(/^#> (.+)/gm, (_, headline) => {
      const result = `<p class="page-headline">${headline}</p>`;

      return result.replace(/^ +| +$/gm, '');
    });

    // Page Cards
    content = content.replace(/-> \[(.+):(.+)\]\((.+)\)/g, (_, title, subtitle, href) => {
      const result = `
        <a href="${href}" class="page-card">
          <h2>${title}</h2>
          <p>${subtitle}</p>
        </a>
        `;

      return result.replace(/^ +| +$/gm, '');
    });

    next(content);
  });
});
