/* site-title plugin for Docsify
 *
 * Copyright (c) 2021 Kevin Zolkiewicz.
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
window.$docsify.plugins.push((hook, vm) => {
  // Customize the site title with a logo and move it below the search box
  hook.ready(function () {
    const options = {
      primary: 'DS Starter',
      secondary: 'Design System Kit',
      logo: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clip-rule="evenodd" /></svg>',
      logoFill: '#000000',
      logoHref: '/',
    };

    if (vm.config.siteTitle) {
      Object.keys(options).forEach((key) => {
        const override = vm.config.siteTitle[key];

        if (typeof override === 'string') {
          options[key] = override;
        }
      });
    }

    const newSiteTitle = document.createElement('a');
    newSiteTitle.href = options.logoHref;
    newSiteTitle.classList.add('site-title');
    newSiteTitle.innerHTML = `
      <div class="site-title__logo" style="color: ${options.logoFill}">${options.logo}</div>
      <div class="site-title__name">
        <div class="site-title__primary">${options.primary}</div>
        <div class="site-title__secondary">${options.secondary}</div>
      </div>
    `;

    const sidebar = document.querySelector('.sidebar');
    const oldSiteTitle = document.querySelector('.sidebar h1.app-name');
    sidebar.prepend(newSiteTitle);
    oldSiteTitle.remove();
  });
});
