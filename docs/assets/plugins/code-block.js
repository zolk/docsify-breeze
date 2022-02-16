window.$docsify.plugins.push((hook) => {
  let id = 0;

  // Replace code preview blocks with rendered previews.
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
              <svg width="11" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.586 3.414A2 2 0 1 0 3.414.586 2 2 0 0 0 .586 3.414ZM.586 9.414a2 2 0 1 0 2.828-2.828A2 2 0 0 0 .586 9.414ZM.586 15.414a2 2 0 1 0 2.828-2.828 2 2 0 0 0-2.828 2.828ZM7.586 3.414A2 2 0 1 0 10.414.586a2 2 0 0 0-2.828 2.828ZM7.586 9.414a2 2 0 1 0 2.828-2.828 2 2 0 0 0-2.828 2.828ZM7.586 15.414a2 2 0 1 0 2.828-2.828 2 2 0 0 0-2.828 2.828Z" fill="currentColor"/></svg>
            </div>
          </div>
          <div class="code-block__source" id=${sourceId}>${pre.outerHTML}</div>
          <div class="code-block__actions">
            <button
              class="code-block__toggle
              aria-expanded="${isExpanded ? 'true' : 'false'}"
              aria-controls="${sourceId}"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              <span>
                ${isExpanded ? 'Hide ' : 'Show'} Code
              </span>
            </button>
            <div class="code-block__actions-spacer"></div>
          </div>
        </div>
      `;

      pre.replaceWith(parser.parseFromString(codeBlock, 'text/html').body);
      id++;
    });

    next(doc.body.innerHTML);
  });

  // Allow for resizing of preview box.
  // Move the copy plugin button to the actions row.
  hook.doneEach(() => {
    [...document.querySelectorAll('.code-block')].map((block) => {
      const resizer = block.querySelector('.code-block__resizer');
      const preview = block.querySelector('.code-block__preview');

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
      button.querySelector('span').innerText = `${isExpanded ? 'Hide ' : 'Show'} Code`;
    }
  });
});
