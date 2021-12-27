function docsifyComponentHeader(hook) {
  const TAG_PREFIX = 'ds-';

  const customElements = fetch('./custom-elements.json')
    .then((res) => res.json())
    .catch((err) => console.error(err));

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
    return getAllComponents(metadata).find(
      (component) => component.tagName === tagName
    );
  }

  hook.beforeEach(async function (content, next) {
    const metadata = await customElements;
    const pathSegments = document.body.dataset.page.split('/');
    const isComponentPage = pathSegments[0] === 'components';

    if (isComponentPage) {
      const baseTagName = pathSegments[1];
      const subPage = pathSegments[2];
      const componentDoc = getComponent(metadata, TAG_PREFIX + baseTagName);

      const usageDocs = await fetch(`/components/${baseTagName}/usage.md`, {
        method: 'HEAD',
      }).then((res) => res);

      // Insert component header
      content = content.replace(/^#{1} ([a-zA-Z]+)/, (_, title) => {
        let usageLink = '';

        if (usageDocs.ok) {
          usageLink = `
            <li ${subPage === 'usage.md' ? 'class="active"' : ''}>
              <a href="/#/components/${baseTagName}/usage">Usage</a>
            </li>
          `;
        }

        const replacement = `
          <h1>${title}</h1>
          <div>Status: ${componentDoc?.status}</div>
          <nav>
            <ul>
              <li ${subPage === 'code.md' ? 'class="active"' : ''}>
                <a href="/#/components/${baseTagName}">Code</a>
              </li>
              ${usageLink}
            </ul>
          </nav>
        `;

        return replacement.replace(/^ +| +$/gm, '');
      });
    }

    next(content);
  });
}

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [docsifyComponentHeader].concat(
  window.$docsify.plugins || []
);
