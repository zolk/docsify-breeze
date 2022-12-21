[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/9683090d/ds-starter) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# DS Starter Kit

A starter template to bootstrap the creation of a design system powered
by Web Components, complete with a documentation engine.

## What does it include?

### Development Stack

This project combines the following technologies for rapidly building,
documenting, and testing Web Components:

- [Lit](https://lit.dev/) for simple and fast Web Components.
- [esbuild](https://esbuild.github.io/) for blazing fast bundling.
- [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) with [Playwright](https://playwright.dev) for testing.
- [Percy](https://percy.io/) for visual regression testing.
- [Custom Elements Manifest Analyzer](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/) for automatic documentation of class members.
- [Plop](https://plopjs.com/) for quickly spinning up new components.

### Documentation Powered by Docsify

Documentation is powered by [Docsify](https://docsify.js.org/), a lightweight
documentation site generator with no statically generated HTML files.
All documentation is written in Markdown.

DS Starter Kit includes a custom theme for Docsify, plus a suite of custom
plugins that enable robust documentation of Web Components. Features include
resizable component previews with source code rendering, a zero-configuration
customization UI editing a component's attributes and slots, and automatic
documentation of the component API.

Unlike heavyweight tools such as Storybook, DS Starter Kit's documentation
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

DS Starter Kit is for organizations looking to create a bespoke component
library or design system that uses Web Components. It includes everything you
need to hit the ground running, including a complete toolchain to write, test,
and build Web Components, plus an optimized documentation framework to ease
development and encourage adoption across your organization.

## Acknowledgements

The use of Docsify as a web components documentation platform was inspired by the [Shoelace](https://shoelace.style)
component library documentation by [Cory LaViska](https://twitter.com/claviska).

## License

This project was created by [Kevin Zolkiewicz](http://zolk.com) and is licensed
under an [MIT License](./LICENSE.md).

<br><br><br>

<p align="center"><a href="https://8thlight.com"><img src="./8l.png" height="75" alt="" /></a><br><i>This project is supported by <a href="https://8thlight.com">8th Light</a>.</i></p>
