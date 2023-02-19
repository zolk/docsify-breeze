/* docsify-site-title
 * A plugin for Docsify for customizing the site title with a logo
 *
 * Copyright (c) 2021 Kevin Zolkiewicz.
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function siteTitle(hook, vm) {
  // Customize the site title with a logo and move it below the search box
  hook.ready(function () {
    const options = {
      primary: "Docsify Breeze",
      secondary: "",
      logo: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/></svg>',
      logoFill: "#000000",
      logoHref: "/",
    };

    if (vm.config.siteTitle) {
      Object.keys(options).forEach((key) => {
        const override = vm.config.siteTitle[key];

        if (typeof override === "string") {
          options[key] = override;
        }
      });
    }

    const newSiteTitle = document.createElement("a");
    newSiteTitle.href = options.logoHref;
    newSiteTitle.classList.add("site-title");
    newSiteTitle.innerHTML = `
      <div class="site-title__logo" style="color: ${options.logoFill}">
        ${options.logo}
      </div>
      <div class="site-title__name">
        <div class="site-title__primary">${options.primary}</div>
        ${
          options.secondary
            ? `<div class="site-title__secondary">${options.secondary}</div>`
            : ""
        }
      </div>
    `;

    const sidebar = document.querySelector(".sidebar");
    const oldSiteTitle = document.querySelector(".sidebar h1.app-name");
    sidebar?.prepend(newSiteTitle);
    oldSiteTitle?.remove();
  });
}

if (window) {
  window.$docsify.plugins = [].concat(window.$docsify.plugins || [], siteTitle);
}
