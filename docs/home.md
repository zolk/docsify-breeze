<div class="hero-wrap">
  <div class="hero">
    <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z" fill="#2C5377"/></svg>
    <h1>Docsify Breeze</h1>
    <p>A Web Component documentation starter kit powered by Docsify.</p>
  </div>
</div>

<h2>What&#8217;s it do?</h2>

Docsify Breeze is a starter toolkit, powered by Docsify, to enable joyful documentation
of [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components).
This toolkit incorporates a suite of custom Docsify plugins, plus a custom
theme, that make documenting Web Components a breeze. The project also includes
the basic foundations for bootstrapping a Web Components-based component library.

<h3>Powered by Docsify</h3>

This project is powered by [Docsify](https://docsify.js.org/), a lightweight
documentation site generator with no statically generated HTML files.
All documentation is written in Markdown.

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

<div class="callout">
<h3>Development Stack</h3>

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
</div>

<h2>Who&#8217;s it for?</h2>

Docsify Breeze is for organizations looking to create a bespoke component
library or design system that uses Web Components. It includes everything you
need to hit the ground running, including a complete toolchain to write, test,
and build Web Components, plus an optimized documentation framework to ease
development and encourage adoption across your organization.
