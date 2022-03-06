/*
 * This plugin is based on docsify-copy-code <https://github.com/jperasmus/docsify-copy-code>.
 *
 * (c) 2017-2020 JP Erasmus <jperasmus11@gmail.com>
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
window.$docsify.plugins.push((hook) => {
  hook.doneEach(function () {
    const targetElms = Array.from(document.querySelectorAll('.markdown-section pre'));

    const template = [
      '<button class="copy-code-button" aria-label="Copy Code">',
      '<svg xmlns="http://www.w3.org/2000/svg" class="copy-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>',
      '<svg xmlns="http://www.w3.org/2000/svg" class="success-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>',
      '</button>',
    ].join('');

    targetElms.forEach((elm) => {
      elm.insertAdjacentHTML('beforeend', template);
    });
  });

  hook.mounted(function () {
    const listenerHost = document.querySelector('.content');

    listenerHost.addEventListener('click', function (evt) {
      const isCopyCodeButton = evt.target.closest('.copy-code-button');

      if (isCopyCodeButton) {
        const buttonElm =
          evt.target.tagName === 'BUTTON' ? evt.target : evt.target.closest('.copy-code-button');
        const range = document.createRange();
        const preElm = buttonElm.closest('pre');
        const codeElm = preElm.querySelector('code');

        let selection = window.getSelection();

        range.selectNode(codeElm);
        selection.removeAllRanges();
        selection.addRange(range);

        navigator.clipboard.writeText(selection).then(
          function () {
            buttonElm.classList.add('success');
            setTimeout(function () {
              buttonElm.classList.remove('success');
            }, 1000);
          },
          function (err) {
            console.error(`docsify-copy-code: ${err}`);

            buttonElm.classList.add('error');
            setTimeout(function () {
              buttonElm.classList.remove('error');
            }, 1000);
          }
        );

        selection = window.getSelection();

        if (typeof selection.removeRange === 'function') {
          selection.removeRange(range);
        } else if (typeof selection.removeAllRanges === 'function') {
          selection.removeAllRanges();
        }
      }
    });
  });
});
