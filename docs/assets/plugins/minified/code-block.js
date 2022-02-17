window.$docsify.plugins.push((w) => {
  let p = 0;
  function m(e) {
    const o = document.createElement('script');
    e.type === 'module'
      ? ((o.type = 'module'), (o.textContent = e.innerHTML))
      : o.appendChild(document.createTextNode(`(() => { ${e.innerHTML} })();`)),
      e.parentNode.replaceChild(o, e);
  }
  w.afterEach(function (e, o) {
    const s = new DOMParser(),
      n = s.parseFromString(e, 'text/html');
    [...n.querySelectorAll('code.preview')].map((r) => {
      const a = r.closest('pre'),
        c = r.classList.contains('expanded'),
        i = 'code-source-' + p,
        l = 'code-preview-' + p,
        d = `
        <div class="code-block ${c ? 'code-block--expanded' : ''}">
          <div class="code-block__preview" id=${l}>
            ${r.textContent}
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
              aria-expanded="${c ? 'true' : 'false'}"
              aria-controls="${i}"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              <span>
                ${c ? 'Hide ' : 'Show'} Code
              </span>
            </button>
            <div class="code-block__actions-spacer"></div>
          </div>
        </div>
      `;
      a.replaceWith(s.parseFromString(d, 'text/html').body), p++;
    }),
      o(n.body.innerHTML);
  }),
    w.doneEach(() => {
      [...document.querySelectorAll('.code-block__preview script')].map((e) => m(e)),
        [...document.querySelectorAll('.code-block')].map((e) => {
          const o = e.querySelector('.code-block__resizer'),
            s = e.querySelector('.code-block__preview');
          let n, r;
          const a = (t) => {
              (n = t.changedTouches ? t.changedTouches[0].pageX : t.clientX),
                (r = parseInt(document.defaultView.getComputedStyle(s).width, 10));
            },
            c = (t) => {
              s.style.width = `${r + t}px`;
            },
            i = (t) => {
              o.classList.add('code-block__resizer--resizing'),
                t.preventDefault(),
                a(t),
                document.addEventListener('mousemove', d),
                document.addEventListener('touchmove', d),
                document.addEventListener('mouseup', u),
                document.addEventListener('touchend', u);
            },
            l = (t) => {
              if (
                (a(t),
                [
                  'ArrowDown',
                  'ArrowLeft',
                  'ArrowUp',
                  'ArrowRight',
                  'Home',
                  'End',
                  'PageUp',
                  'PageDown',
                ].includes(t.key))
              )
                switch ((t.preventDefault(), t.key)) {
                  case 'ArrowLeft':
                  case 'ArrowDown':
                    c(-10);
                    break;
                  case 'ArrowRight':
                  case 'ArrowUp':
                    c(10);
                    break;
                  case 'PageUp':
                    c(100);
                    break;
                  case 'PageDown':
                    c(-100);
                    break;
                  case 'Home':
                    c(-r);
                    break;
                  case 'End':
                    c(1e4);
                    break;
                }
            },
            d = (t) => {
              const v = t.clientX - n;
              c(v);
            },
            u = () => {
              o.classList.remove('code-block__resizer--resizing'),
                document.removeEventListener('mousemove', d),
                document.removeEventListener('touchmove', d),
                document.removeEventListener('mouseup', u),
                document.removeEventListener('touchend', u);
            };
          o.addEventListener('mousedown', i),
            o.addEventListener('touchstart', i),
            o.addEventListener('keydown', l);
        });
    }),
    document.addEventListener('click', (e) => {
      const o = e.target.closest('.code-block__toggle');
      if (o) {
        const s = e.target.closest('.code-block');
        s.classList.toggle('code-block--expanded');
        const n = s.classList.contains('code-block--expanded');
        e.target.setAttribute('aria-expanded', n),
          (o.querySelector('span').innerText = `${n ? 'Hide ' : 'Show'} Code`);
      }
    });
});
