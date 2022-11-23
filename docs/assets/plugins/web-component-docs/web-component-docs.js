/* docsify-web-component-docs
 * A plugin for documenting web components in Docsify
 *
 * Copyright (c) 2021 Kevin Zolkiewicz.
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import { customElements, getComponent, TAG_PREFIX } from "../shared/cem.js";
import { renderMetadata } from "./lib/metadata.js";

window.$docsify.plugins.push((hook) => {
  hook.beforeEach(async function (content, next) {
    const metadata = await customElements;
    const pathSegments = document.body.dataset.page.split("/");
    const tagFromFile = pathSegments[pathSegments.length - 1]?.split(".")[0];

    //
    // Render component status
    //
    content = content.replace(/\[component-status:?([a-z-]+)?\]/g, (_, tag) => {
      const componentMeta = getComponent(
        metadata,
        TAG_PREFIX + (tag ?? tagFromFile)
      );
      const status = componentMeta?.status;
      const result = `<div class="component-status component-status--${status}">${status}</div>`;
      return result.replace(/^ +| +$/gm, "");
    });

    //
    // Render component description
    //
    content = content.replace(
      /\[component-description:?([a-z-]+)?\]/g,
      (_, tag) => {
        const componentMeta = getComponent(
          metadata,
          TAG_PREFIX + (tag ?? tagFromFile)
        );
        const result = `${componentMeta?.description}`;
        return result.replace(/^ +| +$/gm, "");
      }
    );

    //
    // Render component metadata tables.
    //
    content = content.replace(
      /\[component-metadata:?([a-z-]+)?\]/,
      (_, tag) => {
        const componentMeta = getComponent(
          metadata,
          TAG_PREFIX + (tag ?? tagFromFile)
        );
        const result = renderMetadata(componentMeta);
        return result.replace(/^ +| +$/gm, "");
      }
    );

    next(content);
  });

  hook.doneEach(function () {
    // Wrap tables for responsive horizontal scrolling
    const content = document.querySelector(".content");
    const tables = [...content.querySelectorAll("table")];

    tables.map((table) => {
      table.outerHTML = `
        <div class="component-meta-table">
          ${table.outerHTML}
        </div>
      `;
    });
  });
});
