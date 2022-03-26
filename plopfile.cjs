module.exports = function (plop) {
  plop.setHelper('noPrefix', (tag) => tag.replace(/^ds-/, ''));

  plop.setHelper('tagToTitle', (tag) => {
    const withoutPrefix = plop.getHelper('noPrefix');
    const titleCase = plop.getHelper('titleCase');
    return titleCase(withoutPrefix(tag));
  });

  plop.setHelper('tagToDsTitle', (tag) => {
    const tagToTitle = plop.getHelper('tagToTitle');
    return 'Ds' + tagToTitle(tag);
  });

  plop.setGenerator('component', {
    description: 'create files for a new component',
    prompts: [
      {
        type: 'input',
        name: 'tag',
        message: 'tag name (e.g. ds-button)',
        validate: (value) => {
          // Starts with ds- and include only a-z + dashes
          if (!/^ds-[a-z-+]+/.test(value)) {
            return false;
          }

          return true;
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.ts',
        templateFile: 'scripts/plop/templates/component.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.styles.ts',
        templateFile: 'scripts/plop/templates/component.styles.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.test.ts',
        templateFile: 'scripts/plop/templates/component.test.hbs',
      },
      {
        type: 'add',
        path: 'docs/components/{{name}}/{{name}}.md',
        templateFile: 'scripts/plop/templates/component.docs.hbs',
      },
      {
        type: 'modify',
        path: 'src/index.ts',
        pattern: /\/\* plop:component \*\//,
        template: `export { default as Ds{{ properCase name }} } from './components/{{ name }}/{{ name }}';\n/* plop:component */`,
      },
      {
        type: 'modify',
        path: 'docs/_sidebar.md',
        pattern: /<!--plop:component-->/,
        template: `- [{{ properCase name }}](/components/code)\n  <!--plop:component-->`,
      },
    ],
  });
};
