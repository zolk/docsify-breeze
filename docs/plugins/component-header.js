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

      const componentTitle = component
        .split('-')
        .map((segment) => {
          return segment.slice(0, 1).toUpperCase() + segment.slice(1);
        })
        .join(' ');

      content = content.replace(/\[component-header]/g, () => {
        let usageLink = '';

        if (usageDocs.ok) {
          usageLink = `
            <li ${subPage === 'usage.md' ? 'class="active"' : ''}>
              <a href="/#/components/${component}/usage">Usage</a>
            </li>
          `;
        }

        const replacement = `
          <h1>${componentTitle}</h1>
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
