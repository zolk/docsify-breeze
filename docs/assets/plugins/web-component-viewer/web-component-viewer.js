/* docsify-web-component-viewer
 * A Docsify plugin for rendering and customizing web components.
 *
 * Usage instructions:
 *
 * ```html preview expanded button
 * <ds-button>Button</ds-button>
 * ```
 *
 * List of tags:
 * (1 - html) The language of the snippet.
 * (2 - preview) Enables parsing by this plugin.
 * (3 - expanded) Optional. Expands the code source by default.
 * (4 - controls) Optional. Enable the controls feature for this snippet.
 * (5 - slug) Slug for loading the preview in an isolated window.
 *            Required for controls or loading in an isolated window.
 *
 * Copyright (c) 2021 Kevin Zolkiewicz.
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 * This plugin builds upon a similar plugin developed for use with Shoelace <https://shoelace.style/>.
 * Copyright (c) 2020 A Beautiful Site, LLC
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import { renderPreview, handlePreviewResize, handleCodeToggle } from './lib/preview.js';
import { renderControlsInterface } from './lib/controls.js';
import { runScript } from './lib/script-tag.js';
import { kebabToTitleCase } from '../shared/utilities.js';
import { TAG_PREFIX } from '../shared/cem.js';

const handleDocumentClick = (e) => handleCodeToggle(e);

window.$docsify.plugins.push((hook, vm) => {
  let id = 0;

  hook.beforeEach(() => {
    // Cleanup previous event listener to allow toggling display of source code.
    // This prevents multiple event listeners from getting added to the page.
    document.removeEventListener('click', handleDocumentClick);
  });

  // Replace code preview blocks with rendered previews.
  hook.afterEach((html, next) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    [...doc.querySelectorAll('code.preview')].map((codeBlock) => {
      const previewView = renderPreview(codeBlock, id);
      const pre = codeBlock.closest('pre');
      pre.replaceWith(parser.parseFromString(previewView, 'text/html').body);
      id++;
    });

    next(doc.body.innerHTML);
  });

  hook.doneEach(() => {
    // Allow toggling display of source code.
    document.addEventListener('click', handleDocumentClick);

    // Run inline scripts.
    [...document.querySelectorAll('.code-preview__preview script')].map((script) =>
      runScript(script)
    );

    // Allow resize of preview window.
    [...document.querySelectorAll('.code-preview')].map((block) => {
      const resizer = block.querySelector('.code-preview__resizer');
      const preview = block.querySelector('.code-preview__preview');
      handlePreviewResize(preview, resizer);
    });
  });

  // Prepare to load a preview in an isolated window.
  hook.mounted(() => {
    if (vm.route.query.preview || vm.route.query.controls) {
      const overlay = document.createElement('div');
      overlay.style.position = 'absolute';
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.width = '100vw';
      overlay.style.height = '100vh';
      overlay.style.backgroundColor = 'white';

      document.body.appendChild(overlay);
    }
  });

  // Load the preview or controls in an isolated window.
  hook.ready(async () => {
    const exampleId = vm.route.query.preview || vm.route.query.controls;

    // Load the preview.
    if (exampleId) {
      const preview = document.querySelector(`#example-${exampleId}`);
      preview.classList.add('controls__preview');
      document.body.classList.add('example');
      document.body.innerHTML = '';
      document.body.appendChild(preview);
    }

    // Set the preview page title.
    if (vm.route.query.preview) {
      document.title = `${document.title} - ${kebabToTitleCase(exampleId)} - Preview`;
    }

    // Set the controls page title and load the controls interface.
    if (vm.route.query.controls) {
      document.title = `${document.title} - ${kebabToTitleCase(exampleId)} - Customize`;
      document.body.classList.add('controls');

      const pathSegments = document.body.dataset.page.split('/');
      const tagName = TAG_PREFIX + pathSegments[2].split('.')[0];
      renderControlsInterface(tagName);
    }
  });
});
