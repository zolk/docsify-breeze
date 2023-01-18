[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/9683090d/ds-starter) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Docsify Breeze — Painless Web Component Documentation

Docsify Breeze is a starter template, powered by [Docsify](https://docsify.js.org/),
to enable joyful documentation of 
[Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components).
The template incorporates a suite of custom Docsify plugins, plus a custom
theme, that make documenting Web Components a breeze. The project also includes
the basic foundations for bootstrapping a Web Components-based component library.

## What does it include?

### Powered by Docsify

[Docsify](https://docsify.js.org/) is a lightweight documentation site generator
with no statically generated HTML files. All documentation is written in Markdown.

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

### Development Stack

This project also includes the following technologies for rapidly building and
testing Web Components:

- [Lit](https://lit.dev/) for simple and fast Web Components.
- [esbuild](https://esbuild.github.io/) for blazing fast bundling.
- [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) with
  [Playwright](https://playwright.dev) for cross-browser testing.
- [Percy](https://percy.io/) for visual regression testing that integrates
  seamlessly with Docsify thanks to a custom configuration.
- [Custom Elements Manifest Analyzer](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/) for automatic documentation of class members.
- [Plop](https://plopjs.com/) for quickly spinning up new components.

## Who's it for?

Docsify Breeze is for organizations looking to create or document a Web
Component-based component library or design system. The starter template
includes everything you need to hit the ground running, including a 
complete toolchain to write, test, and build Web Components.

## Acknowledgements

The use of Docsify as a web components documentation platform was inspired by
the [Shoelace](https://shoelace.style) component library documentation by
[Cory LaViska](https://twitter.com/claviska).

## License

This project was created by [Kevin Zolkiewicz](http://zolk.com) and is licensed
under an [MIT License](./LICENSE.md).

<br><br><br>

<p align="center"><a href="https://8thlight.com"><img src="./8l.png" height="75" alt="" /></a><br><i>This project is supported by <a href="https://8thlight.com">8th Light</a>.</i></p>
