/*!
 * docsify-copy-code
 *
 * Modified in this installation to remove injected CSS and add SVG icon.
 *
 * v2.1.1
 * https://github.com/jperasmus/docsify-copy-code
 * (c) 2017-2020 JP Erasmus <jperasmus11@gmail.com>
 * MIT license
 */
window.$docsify.plugins.push((hook, vm) => {
  hook.doneEach(function () {
    const targetElms = Array.from(document.querySelectorAll('.code-preview__actions'));
    const i18n = {
      buttonText: 'Copy to clipboard',
      errorText: 'Error',
      successText: 'Copied',
    };

    // Update i18n strings based on options and location.href
    if (vm.config.copyCode) {
      Object.keys(i18n).forEach((key) => {
        const textValue = vm.config.copyCode[key];

        if (typeof textValue === 'string') {
          i18n[key] = textValue;
        } else if (typeof textValue === 'object') {
          Object.keys(textValue).some((match) => {
            const isMatch = location.href.indexOf(match) > -1;

            i18n[key] = isMatch ? textValue[match] : i18n[key];

            return isMatch;
          });
        }
      });
    }

    const template = [
      '<button class="copy-code-button">',
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>',
      `<span class="label">${i18n.buttonText}</span>`,
      `<span class="error">${i18n.errorText}</span>`,
      `<span class="success">${i18n.successText}</span>`,
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
        const buttonElm = evt.target.tagName === 'BUTTON' ? evt.target : evt.target.parentNode;
        const range = document.createRange();
        const preElm = buttonElm.parentNode.parentNode.querySelector('pre');
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
