/* docsify-web-component-docs
 * A plugin for documenting web components in Docsify
 *
 * Copyright (c) 2021 Kevin Zolkiewicz.
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import { customElements, getComponent, TAG_PREFIX } from '../shared/cem.js';
import { renderComponentCard } from './lib/component-card.js';
import { renderMetadata } from './lib/metadata.js';
import { getActiveTheme, setPreviewTheme, renderThemeSelect } from './lib/theme.js';

window.$docsify.plugins.push((hook, vm) => {
  const themes = vm.config.themes;

  hook.mounted(() => {
    if (themes) {
      document.body.classList.add(getActiveTheme());
    }
  });

  hook.beforeEach(async function (content, next) {
    const metadata = await customElements;
    const pathSegments = document.body.dataset.page.split('/');
    const isComponentIndex = pathSegments[1] === 'components.md';
    const isComponentPage = pathSegments[1] === 'components';
    const existingHeader = document.querySelector('.content > .markdown-header');

    if (existingHeader) {
      existingHeader.remove();
    }

    if (isComponentIndex) {
      //
      // Render component cards on component index page
      //
      content = content.replace(/\[component-card:(.+):([a-z-]+)\]/g, (_, name, tag) => {
        const componentMeta = getComponent(metadata, TAG_PREFIX + tag);
        const result = renderComponentCard(componentMeta, tag, name);
        return result.replace(/^ +| +$/gm, '');
      });
    }

    if (isComponentPage) {
      const file = pathSegments[2];
      const baseTagName = file.split('.')[0];
      const componentMeta = getComponent(metadata, TAG_PREFIX + baseTagName);

      // Insert component header.
      content = content.replace(/^#{1} ([a-zA-Z]+)/, (_, title) => {
        const header = document.createElement('header');
        header.classList.add('markdown-header', 'component-header');
        header.innerHTML = `
          <div class="component-title">
            <h1>${title}</h1>
            ${
              componentMeta?.status &&
              `<div class="component-status component-status--${componentMeta?.status}">${componentMeta?.status}</div>`
            }
            ${
              themes
                ? `<div class="theme-switcher">
                    <label for="theme-switcher__select">Select Theme</label>
                    <span class="theme-switcher__icon"></span>
                  </div>`
                : ''
            }
          </div>
        `;

        if (themes) {
          header.querySelector('.theme-switcher').append(renderThemeSelect());
        }

        const content = document.querySelector('.content');
        content.prepend(header);

        const headline = `
          ## Overview

          #> ${componentMeta.description}
        `;
        return headline.replace(/^ +| +$/gm, '');
      });

      // Render component metadata tables.
      content = content.replace(/\[component-metadata\]/, () => {
        const result = renderMetadata(componentMeta);
        return result.replace(/^ +| +$/gm, '');
      });
    }

    next(content);
  });

  hook.doneEach(function () {
    // Set code previews to use the configured background color
    const activeTheme = getActiveTheme();
    setPreviewTheme(activeTheme);

    // Wrap tables for responsive horizontal scrolling
    const content = document.querySelector('.content');
    const tables = [...content.querySelectorAll('table')];

    tables.map((table) => {
      table.outerHTML = `
        <div class="component-meta-table">
          ${table.outerHTML}
        </div>
      `;
    });
  });
});
