window.$docsify.plugins.push((hook) => {
  hook.beforeEach(async function (content, next) {
    const pathSegments = document.body.dataset.page.split("/");
    const isComponentPage = pathSegments[1] === "components";

    //
    // Page Header
    //
    document.querySelector(".content > .markdown-header")?.remove();

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

      const headline = isComponentPage
        ? `
            [component-status]

            ## Overview

            #> [component-description]
          `
        : "";

      return headline.replace(/^ +| +$/gm, "");
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

    //
    // Component Cards
    //
    content = content.replace(
      /\[component-card:(.+):([a-z-]+)\]/g,
      (_, name, tag) => {
        const result = `<li class="component-card">
          <a href="/${pathSegments[1].split(".")[0]}/${tag}">
            <div class="component-card__image">
              <img src="/assets/images/component-cards/${tag}.svg" />
            </div>
            <div class="component-card__header">
              <h2>${name}</h2>
              [component-status:${tag}]
            </div>
            <p>[component-description:${tag}]</p>
          </a>
        </li>`;
        return result.replace(/^ +| +$/gm, "");
      }
    );

    next(content);
  });

  hook.doneEach(() => {
    const pathSegments = document.body.dataset.page.split("/");
    const isComponentPage = pathSegments[1] === "components";

    //
    // Move the component status to the header
    //
    if (isComponentPage) {
      const header = document.querySelector(".content");
      const status = document.querySelector(".component-status");

      header
        ?.querySelector(".component-title")
        ?.insertAdjacentElement("beforeend", status);
    }
  });
});
