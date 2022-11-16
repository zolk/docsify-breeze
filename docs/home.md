<div class="hero-wrap">
  <div class="hero">
    <svg width="99" height="79" viewBox="0 0 70 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.22829 3.65314L35 6.90157L61.775 3.65314C62.5078 3.56126 63.2187 3.94407 63.5578 4.60689L68.1187 13.7266C69.0922 15.6844 68.0531 18.0578 65.9422 18.6594L48.0812 23.7672C46.5609 24.1938 44.9312 23.5594 44.1219 22.1047L35 6.90157L25.8781 22.1047C25.0688 23.5594 23.4391 24.1938 21.9188 23.7672L4.05454 18.6594C1.94798 18.0578 0.905965 15.6844 1.88564 13.7266L6.44657 4.60689C6.77798 3.94407 7.4922 3.56126 8.22829 3.65314ZM35.1203 14L41.1141 23.9969C42.7437 26.7094 45.9922 27.9016 49.0437 27.125L63 23.1438V41.3985C63 43.8047 61.3594 45.9047 59.0187 46.4953L36.6953 52.0735C35.5797 52.3578 34.4203 52.3578 33.3047 52.0735L10.9813 46.4953C8.63954 45.9047 7.00001 43.8047 7.00001 41.3985V23.1438L20.9563 27.125C24.0078 27.9016 27.2563 26.7094 28.8859 23.9969L34.8797 14H35.1203Z" fill="#2C5377"/>
    </svg>
    <h1>DS Starter Kit</h1>
    <p>A toolkit for building and documenting design systems.</p>
  </div>
</div>

<h2>What&#8217;s it do?</h2>

DS Starter Kit is designed to bootstrap the development of a design system or
component library that's built upon [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

<h3>Documentation Powered by Docsify.</h3>

This documentation site is powered by [Docsify](https://docsify.js.org/), a
lightweight documentation site generator with no statically generated HTML files.
It allows all documentation to be written in Markdown.

DS Starter Kit includes a custom theme for Docsify, plus a suite of custom
plugins that enable robust documentation of Web Components. This includes
resizable component previews with source code rendering and automatic
documentation of the component API.

Unlike heavyweight tools such as Storybook, DS Starter Kit's documentation
implementation is specifically tuned for documenting and developing Web
Components. It boots instantly in development, integrates seamlessly with
existing component build processes, and allows for high levels of customization.

<div class="callout">
<h3>Development Stack</h3>

This project combines the following technologies for rapidly building,
documenting, and testing Web Components:

- [Lit](https://lit.dev/) for simple and fast Web Components.
- [esbuild](https://esbuild.github.io/) for blazing fast bundling.
- [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) for unit testing.
- [Percy](https://percy.io/) for visual testing.
- [Custom Elements Manifest Analyzer](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/) for automatic documentation of class members.
- [Plop](https://plopjs.com/) for quickly spinning up new components.
</div>

<h2>Who&#8217;s it for?</h2>

DS Starter Kit is designed for organizations that are looking to create their
own bespoke component library or design system that uses Web Components. It
includes everything you need to get hit the ground running including a complete
toolchain to write, test, and build Web Components plus an optimized
documentation framework to ease development and encourage adoption across your
organization.
