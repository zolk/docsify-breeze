/*
 * This plugin is modeled after a similar plugin built for use with Shoelace <https://shoelace.style/>. MIT License.
 *
 * Copyright (c) 2020 A Beautiful Site, LLC
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
window.$docsify.plugins.push((hook, vm) => {
  // Handles all enhancements using data from the Custom Elements Manifest,
  // including the component headers and documentation tables.
  const TAG_PREFIX = 'ds-';

  const customElements = fetch('/dist/custom-elements.json')
    .then((res) => res.json())
    .catch((err) => console.error(err));

  function generatePropertiesTable(props) {
    return `
      <table>
        <thead>
          <tr>
            <th scope="col">Property</th>
            <th scope="col">Attribute</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Default</th>
          </tr>
        </thead>
        <tbody>
          ${props
            .map((prop) => {
              return `<tr>
                <th scope="row"><code>${prop.name}</code></th>
                <td><code>${prop.attribute}</code></td>
                <td>${prop.description.replace(/`(.*?)`/g, '<code>$1</code>')}</td>
                <td><code>${prop.type.text.replace(/^\| /m, '')}</code></td>
                <td>${prop.default ? `<code>${prop.default}</code>` : '&ndash;'}</td>
              </tr>`;
            })
            .join('')}
        </tbody>
      </table>
    `;
  }

  function generateMethodsList(methods) {
    let result = '';

    methods.map((method) => {
      const hasParams = method.parameters?.length;

      result += `
        <h4 class="component-method-signature"><code>${method.name}(${
        hasParams
          ? method.parameters
              .map((param) => `${param.name}${param.optional ? '?' : ''}: ${param.type.text}`)
              .join(', ')
          : ''
      }) => ${method.return ? method.return.type.text : 'void'}</code></h4>
        <p>${method.description}</p>

        ${
          hasParams
            ? `
              <dl class="component-method-options">
              ${method.parameters.map((param) =>
                param.description
                  ? `<dt><code>${param.name}</code></dt><dd>${param.description}</dd>`
                  : ``
              )}
              </dl>
              `
            : ``
        }
      `;
    });

    return result;
  }

  function generateEventsTable(events) {
    return `
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Event Detail</th>
          </tr>
        </thead>
        <tbody>
          ${events
            .map((event) => {
              return `
                <tr>
                  <th scope="row">
                    <code>${event.name}</code>
                  </th>
                  <td>${event.description}</td>
                  <td>${event.type?.text ? `<code>${event.type?.text}</code>` : '-'}</td>
                </tr>
              `;
            })
            .join('')}
        </tbody>
      </table>
    `;
  }

  function generateSlotsTable(slots) {
    return `
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          ${slots
            .map((slot) => {
              return `
                <tr>
                  <th scope="row">
                    ${slot.name === '' ? 'Default slot' : `<code>${slot.name}</code>`}
                  </th>
                  <td>${slot.description}</td>
                </tr>
              `;
            })
            .join('')}
        </tbody>
      </table>
    `;
  }

  function generateCssPartsTable(parts) {
    return `
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          ${parts
            .map((part) => {
              return `
                <tr>
                  <th scope="row"><code>${part.name}</code></th>
                  <td>${part.description}</td>
                </tr>
              `;
            })
            .join('')}
        </tbody>
      </table>
    `;
  }

  function generateCssPropertiesTable(properties) {
    return `
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          ${properties
            .map((property) => {
              return `
                <tr>
                  <th scope="row"><code>${property.name}</code></th>
                  <td>${property.description}</td>
                </tr>
              `;
            })
            .join('')}
        </tbody>
      </table>
    `;
  }

  function getAllComponents(metadata) {
    const components = [];

    metadata.modules?.map((module) => {
      module.declarations?.map((declaration) => {
        if (declaration.customElement) {
          components.push(declaration);
        }
      });
    });

    return components;
  }

  function getComponent(metadata, tagName) {
    return getAllComponents(metadata).find((component) => component.tagName === tagName);
  }

  function setTheme(newTheme) {
    localStorage.setItem('theme', newTheme);
    setPreviewTheme(newTheme);
    vm.config.themes.forEach((theme) =>
      document.body.classList.toggle(theme.class, theme.class === newTheme)
    );
  }

  function getTheme() {
    return localStorage.getItem('theme') || (vm.config.themes && vm.config.themes[0].class);
  }

  function setPreviewTheme(theme) {
    const bgColor = vm.config.themes.find((t) => t.class === theme).previewBg;

    const codePreviews = document.querySelectorAll('.code-preview__preview');
    codePreviews.forEach((preview) => (preview.style.backgroundColor = bgColor));
  }

  hook.mounted(() => {
    if (vm.config.themes) {
      document.body.classList.add(getTheme());
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
      content = content.replace(/\[component-card:(.+):([a-z-]+)\]/g, (_, name, tag) => {
        const componentMeta = getComponent(metadata, TAG_PREFIX + tag);

        const result = `
          <li class="component-card">
            <a href="/components/${tag}">
              <div class="component-card__image">
                <img src="/assets/images/component-cards/${tag}.svg">
              </div>
              <div class="component-card__header">
                <h2>${name}</h2>
                ${
                  componentMeta?.status &&
                  `<div class="component-status component-status--${componentMeta?.status}">${componentMeta?.status}</div>`
                }
              </div>
              <p>${componentMeta.description}</p>
            </a>
          </li>`;

        return result.replace(/^ +| +$/gm, '');
      });
    }

    if (isComponentPage) {
      const file = pathSegments[2];
      const baseTagName = file.split('.')[0];
      const componentMeta = getComponent(metadata, TAG_PREFIX + baseTagName);

      //
      // Create theme selector
      //
      const themeSelect = document.createElement('select');
      themeSelect.classList.add('theme-switcher');
      themeSelect.id = 'theme-switcher__select';
      vm.config.themes?.forEach(
        (theme) => (themeSelect.innerHTML += `<option value=${theme.class}>${theme.name}</option`)
      );
      themeSelect.value = getTheme();
      themeSelect.onchange = () => {
        setTheme(themeSelect.value);
      };

      //
      // Insert component header
      //
      content = content.replace(/^#{1} ([a-zA-Z]+)/, (_, title) => {
        const header = document.createElement('header');
        header.classList.add('markdown-header', 'component-header');
        header.innerHTML = `
          <div class="section">Components</div>
          <div class="component-title">
            <h1>${title}</h1>
            ${
              componentMeta?.status &&
              `<div class="component-status component-status--${componentMeta?.status}">${componentMeta?.status}</div>`
            }
            ${
              vm.config.themes
                ? `<div class="theme-switcher">
                  <label for="theme-switcher__select">Select Theme</label>
                  <span class="theme-switcher__icon"></span>
                </div>`
                : ''
            }
          </div>
        `;

        if (vm.config.themes) {
          header.querySelector('.theme-switcher').append(themeSelect);
        }

        const content = document.querySelector('.content');
        content.prepend(header);

        const dummyHeader = `## Overview`;
        return dummyHeader.replace(/^ +| +$/gm, '');
      });

      //
      // Handle headline
      //
      content = content.replace(/^#> (.+)/gm, (_, headline) => {
        const result = `<p class="component-headline">${headline}</p>`;

        return result.replace(/^ +| +$/gm, '');
      });

      //
      // Handle component metadata tag
      //
      content = content.replace(/\[component-metadata\]/, () => {
        let result = '';

        const members = componentMeta.members?.filter(
          (member) => member.description && member.privacy !== 'private'
        );
        const props = members?.filter((prop) => {
          return prop.kind === 'field';
        });
        const methods = members?.filter(
          (member) => member.kind === 'method' && member.privacy !== 'private'
        );

        if (props?.length) {
          result += `
          ### Properties
          ${generatePropertiesTable(props)}
        `;
        }

        if (methods?.length) {
          result += `
          ### Methods
          ${generateMethodsList(methods)}
        `;
        }

        if (componentMeta.events?.length) {
          result += `
          ### Events
          ${generateEventsTable(componentMeta.events)}
        `;
        }

        if (componentMeta.slots?.length) {
          result += `
          ### Slots
          ${generateSlotsTable(componentMeta.slots)}
        `;
        }

        if (componentMeta.cssParts?.length) {
          result += `
          ### CSS Parts
          ${generateCssPartsTable(componentMeta.cssParts)}
        `;
        }

        if (componentMeta.cssProperties?.length) {
          result += `
          ### CSS Custom Properties
          ${generateCssPropertiesTable(componentMeta.cssProperties)}
        `;
        }

        return result.replace(/^ +| +$/gm, '');
      });
    }

    next(content);
  });

  hook.doneEach(function () {
    // Set code previews to use the configured background color
    setPreviewTheme(getTheme());

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
