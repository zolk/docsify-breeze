module.exports = function (plop) {
  plop.setHelper("noPrefix", (tag) => tag.replace(/^ds-/, ""));

  plop.setHelper("tagToTitle", (tag) => {
    const withoutPrefix = plop.getHelper("noPrefix");
    const titleCase = plop.getHelper("titleCase");
    return titleCase(withoutPrefix(tag));
  });

  plop.setHelper("tagToTypeTitle", (tag) => {
    const tagToTitle = plop.getHelper("tagToTitle");
    return tagToTitle(tag).replace("-", "");
  });

  plop.setHelper("tagToDisplayTitle", (tag) => {
    const tagToTitle = plop.getHelper("tagToTitle");
    return tagToTitle(tag).replace("-", " ");
  });

  plop.setHelper("tagToDsTitle", (tag) => {
    const tagToTitle = plop.getHelper("tagToTitle");
    return "Ds" + tagToTitle(tag);
  });

  plop.setGenerator("component", {
    description: "create files for a new component",
    prompts: [
      {
        type: "input",
        name: "tag",
        message: "tag name (e.g. ds-button)",
        validate: (value) => {
          // Starts with ds- and include only a-z + dashes
          if (!/^ds-[a-z-+]+/.test(value)) {
            return false;
          }

          return true;
        },
      },
      {
        type: "input",
        name: "description",
        message: "short component description",
      },
    ],
    actions: [
      {
        type: "add",
        path: "../../src/components/{{noPrefix tag}}/{{noPrefix tag}}.ts",
        templateFile: "scripts/plop/templates/component.hbs",
      },
      {
        type: "add",
        path: "../../src/components/{{noPrefix tag}}/{{noPrefix tag}}.styles.ts",
        templateFile: "scripts/plop/templates/component.styles.hbs",
      },
      {
        type: "add",
        path: "../../src/components/{{noPrefix tag}}/{{noPrefix tag}}.test.ts",
        templateFile: "scripts/plop/templates/component.test.hbs",
      },
      {
        type: "add",
        path: "../../docs/components/{{noPrefix tag}}/{{noPrefix tag}}.md",
        templateFile: "scripts/plop/templates/component.docs.hbs",
      },
      {
        type: "modify",
        path: "../../src/index.ts",
        pattern: /\/\* plop:component \*\//,
        template: `export { default as {{ tagToDsTitle tag }} } from './components/{{ noPrefix tag }}/{{ tag }}';\n/* plop:component */`,
      },
      {
        type: "modify",
        path: "../../docs/_sidebar.md",
        pattern: /<!--plop:component-->/,
        template: `- [{{ tagToTitle tag }}](/components/{{noPrefix tag}})\n  <!--plop:component-->`,
      },
      {
        type: "modify",
        path: "../../docs/components.md",
        pattern: /<!--plop:component-->/,
        template: `[component-card:{{ tagToTitle tag }}:{{noPrefix tag}}]\n<!--plop:component-->`,
      },
    ],
  });
};
