function docsifyComponentWrapper(hook) {
  const TAG_PREFIX = 'ds-';

  const customElements = fetch('./custom-elements.json')
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
                <td>${prop.description.replace(
                  /`(.*?)`/g,
                  '<code>$1</code>'
                )}</td>
                <td><code>${prop.type.text.replace(/^\| /m, '')}</code></td>
                <td>${
                  prop.default ? `<code>${prop.default}</code>` : '&ndash;'
                }</td>
              </tr>`;
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
      const componentMeta = getComponent(metadata, TAG_PREFIX + baseTagName);
      const usageDoc = await fetch(`/components/${baseTagName}/usage.md`, {
        method: 'HEAD',
      }).then((res) => res);

      //
      // Insert component header
      //
      content = content.replace(/^#{1} ([a-zA-Z]+)/, (_, title) => {
        let usageLink = '';

        if (usageDoc.ok) {
          usageLink = `
            <li ${subPage === 'usage.md' ? 'class="active"' : ''}>
              <a href="/#/components/${baseTagName}/usage">Usage</a>
            </li>
          `;
        }

        const replacement = `
          <h1>${title}</h1>
          <div>Status: ${componentMeta?.status}</div>
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

      //
      // Append component metadata
      //
      let result = '';

      const members = componentMeta.members?.filter(
        (member) => member.description && member.privacy !== 'private'
      );
      const props = members?.filter((prop) => {
        return prop.kind === 'field';
      });
      // const methods = members?.filter(
      //   (prop) => prop.kind === 'method' && prop.privacy !== 'private'
      // );

      if (props?.length) {
        result += `
          ## Properties
          ${generatePropertiesTable(props)}
        `;
      }

      content = content + result.replace(/^ +| +$/gm, '');
    }

    next(content);
  });
}

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [docsifyComponentWrapper].concat(
  window.$docsify.plugins || []
);
