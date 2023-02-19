[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Docsify Breeze — Painless Web Component Docs

Docsify Breeze is a documentation toolkit, powered by [Docsify](https://docsify.js.org/),
to enable joyful documentation of
[Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components).
The template incorporates a suite of custom Docsify plugins, plus a custom
theme, that make documenting Web Components a breeze.

[**See Breeze in action**](https://docsify-breeze.vercel.app)

## What does it offer?

[Docsify](https://docsify.js.org/) is a lightweight documentation site generator
with no statically generated HTML files. All documentation is written in
Markdown.

Breeze includes a custom theme for Docsify, plus a suite of custom
plugins that enable robust documentation of Web Components. Features include
resizable component previews with source code rendering, a zero-configuration
customization UI editing a component's attributes and slots, and automatic
documentation of the component API.

Unlike heavyweight tools such as Storybook, Breeze's documentation
implementation is specifically tuned for documenting and developing Web
Components. It boots instantly in development, integrates seamlessly with
existing component build processes, and allows for high levels of customization.

Several of the Docsify plugins created for this project are also available à la
carte for any Docsify installation:

- [docsify-web-component-docs](https://github.com/zolk/docsify-web-component-docs)
- [docsify-web-component-viewer](https://github.com/zolk/docsify-web-component-viewer)
- [docsify-theme-switcher](https://github.com/zolk/docsify-theme-switcher)
- [docsify-github-edit-link](https://github.com/zolk/docsify-github-edit-link)

## Who's it for?

Docsify Breeze is for organizations looking to document a Web
Component-based component library or design system.

## Installation and Theming

If you're creating a new Docsify site from scratch, first install the Docsify
CLI:

```bash
npm i docsify-cli -g
```

Then initialize your new Docsify site:

```bash
docsify init ./docs
```

To setup Breeze, modify the `index.html` file to load its plugins, styles,
default tokens, and basic configuration options:

```html
<html>
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta charset="UTF-8" />
    <link
      rel="stylesheet"
      href="//cdn.jsdelivr.net/npm/docsify-breeze@1/theme/breeze.css"
    />
    <link
      rel="stylesheet"
      href="//cdn.jsdelivr.net/npm/docsify-breeze@1/theme/tokens/breeze-tokens.css"
    />
  </head>
  <body>
    <div id="app"></div>
    <script>
      window.$docsify = {
        //...
      };
    </script>
    <script src="//cdn.jsdelivr.net/npm/docsify@4"></script>
    <script
      src="//cdn.jsdelivr.net/npm/docsify-breeze@1/index.js"
      type="module"
    ></script>
  </body>
</html>
```

For more documentation about Docsify itself, visit the
[Docsify site](https://docsify.js.org/).

### Theming Breeze

Breeze is fully themeable through the use of "tokens," which are simply native
CSS Custom Properties. You can create your own token set by downloading a copy
of breeze-tokens.css, editing the values as desired, and including it with your
local Docsify installation.

## Acknowledgements

The use of Docsify as a web components documentation platform was inspired by
the [Shoelace](https://shoelace.style) component library documentation by
[Cory LaViska](https://twitter.com/claviska).

## License

This project was created by [Kevin Zolkiewicz](http://zolk.com) and is licensed
under an [MIT License](./LICENSE.md).

<br><br><br>

<p align="center"><a href="https://8thlight.com"><img src="./8l.png" height="75" alt="" /></a><br><i>This project is supported by <a href="https://8thlight.com">8th Light</a>.</i></p>
