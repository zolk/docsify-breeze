function docsifyCodeBlock(hook, vm) {
  let id = 0;

  hook.afterEach(function (html, next) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    [...doc.querySelectorAll('code.preview')].map((code) => {
      const pre = code.closest('pre');

      const isExpanded = code.classList.contains('expanded');
      const sourceId = 'code-source-' + id;

      const codeBlock = `
        <div class="code-block ${isExpanded ? 'code-block--expanded' : ''}">
          <div class="code-block__preview">
            ${code.textContent}
          </div>

          <div class="code-block__source" id=${sourceId}>
            ${pre.outerHTML}
          </div>

          <div class="code-block__actions">
            <button
              class="code-block__toggle"
              aria-expanded="${isExpanded ? 'true' : 'false'}"
              aria-controls="${sourceId}"
            >
              ${isExpanded ? 'Hide ' : 'Show'} Code
            </button>
          </div>
        </div>
        `;

      pre.replaceWith(parser.parseFromString(codeBlock, 'text/html').body);

      id++;
    });

    next(doc.body.innerHTML);
  });

  document.addEventListener('click', (e) => {
    const button = e.target.closest('.code-block__toggle');

    if (button) {
      const codeBlock = e.target.closest('.code-block');
      codeBlock.classList.toggle('code-block--expanded');

      const isExpanded = codeBlock.classList.contains('code-block--expanded');
      e.target.setAttribute('aria-expanded', isExpanded);
      button.innerText = `${isExpanded ? 'Hide ' : 'Show'} Code`;
    }
  });
}

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [docsifyCodeBlock].concat(
  window.$docsify.plugins || []
);
