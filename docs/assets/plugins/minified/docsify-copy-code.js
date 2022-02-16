/*!
 * docsify-copy-code
 *
 * Modified in this installation to remove injected CSS and add SVG icon.
 *
 * v2.1.1
 * https://github.com/jperasmus/docsify-copy-code
 * (c) 2017-2020 JP Erasmus <jperasmus11@gmail.com>
 * MIT license
 */ window.$docsify.plugins.push((r, a) => {
  r.doneEach(function () {
    const l = Array.from(document.querySelectorAll('.code-block__actions')),
      e = { buttonText: 'Copy to clipboard', errorText: 'Error', successText: 'Copied' };
    a.config.copyCode &&
      Object.keys(e).forEach((o) => {
        const t = a.config.copyCode[o];
        typeof t == 'string'
          ? (e[o] = t)
          : typeof t == 'object' &&
            Object.keys(t).some((c) => {
              const s = location.href.indexOf(c) > -1;
              return (e[o] = s ? t[c] : e[o]), s;
            });
      });
    const i = [
      '<button class="docsify-copy-code-button">',
      '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>',
      `<span class="label">${e.buttonText}</span>`,
      `<span class="error">${e.errorText}</span>`,
      `<span class="success">${e.successText}</span>`,
      '</button>',
    ].join('');
    l.forEach((o) => {
      o.insertAdjacentHTML('beforeend', i);
    });
  }),
    r.mounted(function () {
      document.querySelector('.content').addEventListener('click', function (e) {
        if (e.target.closest('.docsify-copy-code-button')) {
          const o = e.target.tagName === 'BUTTON' ? e.target : e.target.parentNode,
            t = document.createRange(),
            s = o.parentNode.parentNode.querySelector('pre').querySelector('code');
          let n = window.getSelection();
          t.selectNode(s),
            n.removeAllRanges(),
            n.addRange(t),
            navigator.clipboard.writeText(n).then(
              function () {
                o.classList.add('success'),
                  setTimeout(function () {
                    o.classList.remove('success');
                  }, 1e3);
              },
              function (d) {
                console.error(`docsify-copy-code: ${d}`),
                  o.classList.add('error'),
                  setTimeout(function () {
                    o.classList.remove('error');
                  }, 1e3);
              }
            ),
            (n = window.getSelection()),
            typeof n.removeRange == 'function'
              ? n.removeRange(t)
              : typeof n.removeAllRanges == 'function' && n.removeAllRanges();
        }
      });
    });
});
