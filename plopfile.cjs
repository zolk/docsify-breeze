/* eslint-disable sort-keys */
module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'create files for a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'tag name (without ds-* prefix)',
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
      {
        type: 'append',
        path: 'snapshots.yml',
        separator: '',
        template: `- name: {{ properCase name }}\n  url: http://localhost:3000/components/{{ name }}\n`,
      },
    ],
  });
};
