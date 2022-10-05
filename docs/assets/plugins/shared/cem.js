export const TAG_PREFIX = `${window.$docsify.component.prefix}-`;

export const customElements = fetch(window.$docsify.component.manifestPath)
  .then((res) => res.json())
  .catch((err) => console.error(err));

export const getAllComponents = (metadata) => {
  const components = [];

  metadata.modules?.map((module) => {
    module.declarations?.map((declaration) => {
      if (declaration.customElement) {
        components.push(declaration);
      }
    });
  });

  return components;
};

export const getComponent = (metadata, tagName) => {
  return getAllComponents(metadata).find((component) => component.tagName === tagName);
};
