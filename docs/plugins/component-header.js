function docsifyComponentHeader(hook, vm) {
  hook.beforeEach(async function (content, next) {
    const componentPath = location.href.match(
      /.*\/components\/([a-z-]+)(?:\/([a-z-]+))?/
    );

    if (componentPath) {
      const component = componentPath[1];
      const subPage = componentPath[2];

      const usageDocs = await fetch(`/components/${component}/usage.md`, {
        method: 'HEAD',
      }).then((res) => res);

      content = content.replace(/\[component-header]/g, () => {
        let usageLink = '';

        if (usageDocs.ok) {
          usageLink = `
            <li ${subPage === 'usage' ? 'class="active"' : ''}>
              <a href="/#/components/${component}/usage">Usage</a>
            </li>
          `;
        }

        const replacement = `
          <nav>
            <ul>
              <li ${!subPage ? 'class="active"' : ''}>
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
