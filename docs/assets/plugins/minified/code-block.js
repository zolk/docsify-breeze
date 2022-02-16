window.$docsify.plugins.push((w) => {
  let p = 0;
  w.afterEach(function (s, t) {
    const c = new DOMParser(),
      r = c.parseFromString(s, 'text/html');
    [...r.querySelectorAll('code.preview')].map((d) => {
      const a = d.closest('pre'),
        o = d.classList.contains('expanded'),
        i = 'code-source-' + p,
        l = 'code-preview-' + p,
        n = `
        <div class="code-block ${o ? 'code-block--expanded' : ''}">
          <div class="code-block__preview" id=${l}>
            ${d.textContent}
            <div
              class="code-block__resizer"
              aria-controls="${l}"
              role="slider"
              tabindex="0"
            >
              <svg width="11" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.586 3.414A2 2 0 1 0 3.414.586 2 2 0 0 0 .586 3.414ZM.586 9.414a2 2 0 1 0 2.828-2.828A2 2 0 0 0 .586 9.414ZM.586 15.414a2 2 0 1 0 2.828-2.828 2 2 0 0 0-2.828 2.828ZM7.586 3.414A2 2 0 1 0 10.414.586a2 2 0 0 0-2.828 2.828ZM7.586 9.414a2 2 0 1 0 2.828-2.828 2 2 0 0 0-2.828 2.828ZM7.586 15.414a2 2 0 1 0 2.828-2.828 2 2 0 0 0-2.828 2.828Z" fill="currentColor"/></svg>
            </div>
          </div>
          <div class="code-block__source" id=${i}>${a.outerHTML}</div>
          <div class="code-block__actions">
            <button
              class="code-block__toggle
              aria-expanded="${o ? 'true' : 'false'}"
              aria-controls="${i}"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              <span>
                ${o ? 'Hide ' : 'Show'} Code
              </span>
            </button>
            <div class="code-block__actions-spacer"></div>
          </div>
        </div>
      `;
      a.replaceWith(c.parseFromString(n, 'text/html').body), p++;
    }),
      t(r.body.innerHTML);
  }),
    w.doneEach(() => {
      [...document.querySelectorAll('.code-block')].map((s) => {
        const t = s.querySelector('.code-block__resizer'),
          c = s.querySelector('.code-block__preview');
        let r, d;
        const a = (e) => {
            (r = e.changedTouches ? e.changedTouches[0].pageX : e.clientX),
              (d = parseInt(document.defaultView.getComputedStyle(c).width, 10));
          },
          o = (e) => {
            c.style.width = `${d + e}px`;
          },
          i = (e) => {
            t.classList.add('code-block__resizer--resizing'),
              e.preventDefault(),
              a(e),
              document.addEventListener('mousemove', n),
              document.addEventListener('touchmove', n),
              document.addEventListener('mouseup', u),
              document.addEventListener('touchend', u);
          },
          l = (e) => {
            if (
              (a(e),
              [
                'ArrowDown',
                'ArrowLeft',
                'ArrowUp',
                'ArrowRight',
                'Home',
                'End',
                'PageUp',
                'PageDown',
              ].includes(e.key))
            )
              switch ((e.preventDefault(), e.key)) {
                case 'ArrowLeft':
                case 'ArrowDown':
                  o(-10);
                  break;
                case 'ArrowRight':
                case 'ArrowUp':
                  o(10);
                  break;
                case 'PageUp':
                  o(100);
                  break;
                case 'PageDown':
                  o(-100);
                  break;
                case 'Home':
                  o(-d);
                  break;
                case 'End':
                  o(1e4);
                  break;
              }
          },
          n = (e) => {
            const v = e.clientX - r;
            o(v);
          },
          u = () => {
            t.classList.remove('code-block__resizer--resizing'),
              document.removeEventListener('mousemove', n),
              document.removeEventListener('touchmove', n),
              document.removeEventListener('mouseup', u),
              document.removeEventListener('touchend', u);
          };
        t.addEventListener('mousedown', i),
          t.addEventListener('touchstart', i),
          t.addEventListener('keydown', l);
      });
    }),
    document.addEventListener('click', (s) => {
      const t = s.target.closest('.code-block__toggle');
      if (t) {
        const c = s.target.closest('.code-block');
        c.classList.toggle('code-block--expanded');
        const r = c.classList.contains('code-block--expanded');
        s.target.setAttribute('aria-expanded', r),
          (t.querySelector('span').innerText = `${r ? 'Hide ' : 'Show'} Code`);
      }
    });
});
