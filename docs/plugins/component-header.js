function docsifyComponentHeader(hook, vm) {
  hook.beforeEach(async function (content, next) {
    const pathSegments = document.body.dataset.page.split('/');
    const isComponentPage = pathSegments[0] === 'components';

    if (isComponentPage) {
      const component = pathSegments[1];
      const subPage = pathSegments[2];

      const usageDocs = await fetch(`/components/${component}/usage.md`, {
        method: 'HEAD',
      }).then((res) => res);

      content = content.replace(/^#{1} ([a-zA-Z]+)/, (_, title) => {
        let usageLink = '';

        if (usageDocs.ok) {
          usageLink = `
            <li ${subPage === 'usage.md' ? 'class="active"' : ''}>
              <a href="/#/components/${component}/usage">Usage</a>
            </li>
          `;
        }

        const replacement = `
          <h1>${title}</h1>
          <nav>
            <ul>
              <li ${subPage === 'code.md' ? 'class="active"' : ''}>
                <a href="/#/components/${component}">Code</a>
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
