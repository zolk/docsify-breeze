import { customElements, getComponent, TAG_PREFIX } from "../shared/cem.js";
import { renderComponentCard } from "./lib/component-card.js";

window.$docsify.plugins.push((hook) => {
  hook.beforeEach(async function (content, next) {
    const metadata = await customElements;
    const pathSegments = document.body.dataset.page.split("/");
    const isComponentPage = pathSegments[1] === "components";
    const tagFromFile = pathSegments[pathSegments.length - 1]?.split(".")[0];

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

      if (isComponentPage) {
        const componentMeta = getComponent(metadata, TAG_PREFIX + tagFromFile);
        const status = componentMeta?.status;
        const result = `<div class="component-status component-status--${status}">${status}</div>`;
        header
          ?.querySelector(".component-title")
          ?.insertAdjacentHTML("beforeend", result);
      }

      const content = document.querySelector(".content");
      content.prepend(header);

      const headline = isComponentPage
        ? `
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
        const componentMeta = getComponent(metadata, TAG_PREFIX + tag);
        const result = renderComponentCard(componentMeta, tag, name);
        return result.replace(/^ +| +$/gm, "");
      }
    );

    next(content);
  });
});
