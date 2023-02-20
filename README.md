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
and default theming tokens:

```html
<html>
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta charset="UTF-8" />
    <link
      rel="stylesheet"
      href="//cdn.jsdelivr.net/npm/docsify-breeze@1/dist/breeze/theme/breeze.min.css"
    />
    <link
      rel="stylesheet"
      href="//cdn.jsdelivr.net/npm/docsify-breeze@1/dist/breeze/theme/tokens/breeze-tokens.min.css"
    />
  </head>
  <body>
    <div id="app"></div>
    <script>
      window.$docsify = {
        name: "",
        repo: "",
      };
    </script>
    <script src="//cdn.jsdelivr.net/npm/docsify@4"></script>
    <script
      src="//cdn.jsdelivr.net/npm/docsify-breeze@1"
      type="module"
    ></script>
  </body>
</html>
```

For more documentation about Docsify itself, visit the
[Docsify site](https://docsify.js.org/).

### Configuration Options

#### Site Title

You can configure the site name, description, and logo that appears in the
sidebar by adding the following to your Docsify configuration:

```html
<script>
  window.$docsify = {
    // ... (your existing Docsify config)
    siteTitle: {
      primary: "My Site Title",
      secondary: "My Site Description",
      logo: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>',
      logoFill: "#ff6842",
    },
  };
</script>
```

This includes the following options:

- **siteTitle.primary**: The name of your site.
- **siteTitle.secondary**: Optional. A description to appear below your site's name.
- **siteTitle.logo**: Your site's logo as SVG markup.
- **siteTitle.logoFill**: Optional. The fill color of your logo (requires that your SVG uses `currentColor` for stroke and fill values).

#### GitHub Edit Link

Refer to [docsify-github-edit-link](https://github.com/zolk/docsify-github-edit-link)
for a full list of requirements, configuration, and usage options.

GitHub Edit Link comes bundled with Breeze, so there's no need to separately
include it's JavaScript plugin.

#### Theme Switcher

Refer to [docsify-theme-switcher](https://github.com/zolk/docsify-theme-switcher)
for a full list of requirements, configuration, and usage options.

Theme Switcher comes bundled with Breeze, so there's no need to separately
include it's JavaScript plugin.

#### Web Component Docs

Refer to [docsify-web-component-docs](https://github.com/zolk/docsify-web-component-docs)
for a full list of requirements, configuration, and usage options.

Web Components Docs comes bundled with Breeze, so there's no need to separately
include it's JavaScript plugin.

#### Web Component Viewer

Refer to [docsify-web-component-viewer](https://github.com/zolk/docsify-web-component-viewer)
for a full list of requirements, configuration, and usage options.

Web Components Viewer comes bundled with Breeze, so there's no need to separately
include it's JavaScript plugin.

### Theming Breeze

Breeze is fully themeable through the use of "tokens," which are simply native
CSS Custom Properties. You can create your own token set by downloading a copy
of [breeze-tokens.css](https://github.com/zolk/docsify-breeze/blob/main/src/breeze/theme/tokens/breeze-tokens.css),
editing the values as desired, and including it with your
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
