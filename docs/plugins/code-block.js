function docsifyCodeBlock(hook) {
  let id = 0;

  hook.afterEach(function (html, next) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    [...doc.querySelectorAll('code.preview')].map((block) => {
      const pre = block.closest('pre');

      const isExpanded = block.classList.contains('expanded');
      const sourceId = 'code-source-' + id;
      const previewId = 'code-preview-' + id;

      const codeBlock = `
        <div class="code-block ${isExpanded ? 'code-block--expanded' : ''}">
          <div class="code-block__preview" id=${previewId}>
            ${block.textContent}
            <div
              class="code-block__resizer"
              aria-controls="${previewId}"
              role="slider"
              tabindex="0"
            >
              ...
            </div>
          </div>

          <div class="code-block__source" id=${sourceId}>${pre.outerHTML}</div>

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

  // Allow for resizing of preview box
  hook.doneEach(() => {
    [...document.querySelectorAll('.code-block__preview')].map((preview) => {
      const resizer = preview.querySelector('.code-block__resizer');

      let startX;
      let startWidth;

      const getStart = (event) => {
        startX = event.changedTouches ? event.changedTouches[0].pageX : event.clientX;
        startWidth = parseInt(document.defaultView.getComputedStyle(preview).width, 10);
      };

      const setWidth = (newWidth) => {
        preview.style.width = `${startWidth + newWidth}px`;
      };

      const mouseDownHandler = (event) => {
        resizer.classList.add('code-block__resizer--resizing');
        event.preventDefault();
        getStart(event);

        document.addEventListener('mousemove', startDrag);
        document.addEventListener('touchmove', startDrag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);
      };

      const keyDownHandler = (event) => {
        getStart(event);

        if (
          [
            'ArrowDown',
            'ArrowLeft',
            'ArrowUp',
            'ArrowRight',
            'Home',
            'End',
            'PageUp',
            'PageDown',
          ].includes(event.key)
        ) {
          event.preventDefault();

          switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowDown':
              setWidth(-10);
              break;
            case 'ArrowRight':
            case 'ArrowUp':
              setWidth(10);
              break;
            case 'PageUp':
              setWidth(100);
              break;
            case 'PageDown':
              setWidth(-100);
              break;
            case 'Home':
              setWidth(-startWidth);
              break;
            case 'End':
              setWidth(10000);
              break;
          }
        }
      };

      const startDrag = (event) => {
        const newX = event.clientX - startX;
        setWidth(newX);
      };

      const stopDrag = () => {
        resizer.classList.remove('code-block__resizer--resizing');
        document.removeEventListener('mousemove', startDrag);
        document.removeEventListener('touchmove', startDrag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchend', stopDrag);
      };

      resizer.addEventListener('mousedown', mouseDownHandler);
      resizer.addEventListener('touchstart', mouseDownHandler);
      resizer.addEventListener('keydown', keyDownHandler);
    });
  });

  // Toggle display of source code
  document.addEventListener('click', (event) => {
    const button = event.target.closest('.code-block__toggle');

    if (button) {
      const codeBlock = event.target.closest('.code-block');
      codeBlock.classList.toggle('code-block--expanded');

      const isExpanded = codeBlock.classList.contains('code-block--expanded');
      event.target.setAttribute('aria-expanded', isExpanded);
      button.innerText = `${isExpanded ? 'Hide ' : 'Show'} Code`;
    }
  });
}

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [docsifyCodeBlock].concat(window.$docsify.plugins || []);
