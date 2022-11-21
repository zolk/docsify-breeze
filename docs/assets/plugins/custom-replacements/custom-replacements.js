window.$docsify.plugins.push((hook) => {
  hook.beforeEach(async function (content, next) {
    //
    // Page Header
    //
    content = content.replace(/^#{1} ([a-zA-Z ]+)/, (_, title) => {
      const header = document.createElement("header");
      header.classList.add("markdown-header", "component-header");
      header.innerHTML = `
          <div class="component-title">
            <h1>${title}</h1>
          </div>
        `;

      const content = document.querySelector(".content");
      content.prepend(header);

      return "";
    });

    //
    // Page Headline
    //
    content = content.replace(/^#> (.+)/gm, (_, headline) => {
      const result = `<p class="page-headline">${headline}</p>`;

      return result.replace(/^ +| +$/gm, "");
    });

    //
    // Page Cards
    //
    content = content.replace(
      /-> \[(.+):(.+)\]\((.+)\)/g,
      (_, title, subtitle, href) => {
        const result = `
        <a href="${href}" class="page-card">
          <h2>${title}</h2>
          <p>${subtitle}</p>
        </a>
        `;

        return result.replace(/^ +| +$/gm, "");
      }
    );

    next(content);
  });
});
