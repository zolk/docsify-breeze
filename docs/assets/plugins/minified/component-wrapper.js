window.$docsify.plugins.push((m) => {
  const v = 'ds-',
    P = fetch('/dist/custom-elements.json')
      .then((e) => e.json())
      .catch((e) => console.error(e));
  function w(e) {
    return `
      <table>
        <thead>
          <tr>
            <th scope="col">Property</th>
            <th scope="col">Attribute</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Default</th>
          </tr>
        </thead>
        <tbody>
          ${e
            .map(
              (t) => `<tr>
                <th scope="row"><code>${t.name}</code></th>
                <td><code>${t.attribute}</code></td>
                <td>${t.description.replace(/`(.*?)`/g, '<code>$1</code>')}</td>
                <td><code>${t.type.text.replace(/^\| /m, '')}</code></td>
                <td>${t.default ? `<code>${t.default}</code>` : '&ndash;'}</td>
              </tr>`
            )
            .join('')}
        </tbody>
      </table>
    `;
  }
  function S(e) {
    let t = '';
    return (
      e.map((o) => {
        var l;
        const n = (l = o.parameters) == null ? void 0 : l.length;
        t += `
        <h3><code>${o.name}(${
          n
            ? o.parameters
                .map((c) => `${c.name}${c.optional ? '?' : ''}: ${c.type.text}`)
                .join(', ')
            : ''
        }) => ${o.return ? o.return.type.text : 'void'}</code></h3>
        <p>${o.description}</p>

        ${
          n
            ? `
              <dl class="method-list">
              ${o.parameters.map((c) =>
                c.description ? `<dt><code>${c.name}</code></dt><dd>${c.description}</dd>` : ''
              )}
              </dl>
              `
            : ''
        }
      `;
      }),
      t
    );
  }
  function T(e) {
    return `
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Event Detail</th>
          </tr>
        </thead>
        <tbody>
          ${e
            .map((t) => {
              var o, n;
              return `
                <tr>
                  <th scope="row">
                    <code>${t.name}</code>
                  </th>
                  <td>${t.description}</td>
                  <td>${
                    ((o = t.type) == null ? void 0 : o.text)
                      ? `<code>${(n = t.type) == null ? void 0 : n.text}</code>`
                      : '-'
                  }</td>
                </tr>
              `;
            })
            .join('')}
        </tbody>
      </table>
    `;
  }
  function C(e) {
    return `
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          ${e
            .map(
              (t) => `
                <tr>
                  <th scope="row">
                    ${t.name === '' ? 'Default slot' : `<code>${t.name}</code>`}
                  </th>
                  <td>${t.description}</td>
                </tr>
              `
            )
            .join('')}
        </tbody>
      </table>
    `;
  }
  function D(e) {
    return `
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          ${e
            .map(
              (t) => `
                <tr>
                  <th scope="row"><code>${t.name}</code></th>
                  <td>${t.description}</td>
                </tr>
              `
            )
            .join('')}
        </tbody>
      </table>
    `;
  }
  function E(e) {
    return `
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          ${e
            .map(
              (t) => `
                <tr>
                  <th scope="row"><code>${t.name}</code></th>
                  <td>${t.description}</td>
                </tr>
              `
            )
            .join('')}
        </tbody>
      </table>
    `;
  }
  function j(e) {
    var o;
    const t = [];
    return (
      (o = e.modules) == null ||
        o.map((n) => {
          var l;
          (l = n.declarations) == null ||
            l.map((c) => {
              c.customElement && t.push(c);
            });
        }),
      t
    );
  }
  function H(e, t) {
    return j(e).find((o) => o.tagName === t);
  }
  m.beforeEach(async function (e, t) {
    const o = await P,
      n = document.body.dataset.page.split('/'),
      l = n[1] === 'components',
      c = document.querySelector('.content > .markdown-header');
    if ((c && c.remove(), l)) {
      const u = n[2],
        f = n[3],
        s = H(o, v + u),
        x = await fetch(`/components/${u}/usage.md`, { method: 'HEAD' }).then((a) => a);
      (e = e.replace(/^#{1} ([a-zA-Z]+)/, (a, r) => {
        let d = '';
        x.ok &&
          (d = `
            <li ${f === 'usage.md' ? 'class="active"' : ''}>
              <a href="/components/${u}/usage">Usage</a>
            </li>
          `);
        const i = document.createElement('header');
        return (
          i.classList.add('markdown-header', 'component-header'),
          (i.innerHTML = `
          <div class="section">Components</div>
          <div class="header-status">
            <h1>${r}</h1>
            ${
              (s == null ? void 0 : s.status) &&
              `<div class="status status--${s == null ? void 0 : s.status}">${
                s == null ? void 0 : s.status
              }</div>`
            }
          </div>
          <nav>
            <ul class="header-nav">
              <li ${f === 'code.md' ? 'class="active"' : ''}>
                <a href="/components/${u}">Code</a>
              </li>
              ${d}
            </ul>
          </nav>
        `),
          document.querySelector('.content').prepend(i),
          '## Overview'.replace(/^ +| +$/gm, '')
        );
      })),
        (e = e.replace(/^#> (.+)/gm, (a, r) =>
          `<p class="headline">${r}</p>`.replace(/^ +| +$/gm, '')
        )),
        (e = e.replace(/\[component-metadata\]/, () => {
          var p, $, g, b, y;
          let a = '';
          const r =
              (p = s.members) == null
                ? void 0
                : p.filter((h) => h.description && h.privacy !== 'private'),
            d = r == null ? void 0 : r.filter((h) => h.kind === 'field'),
            i =
              r == null ? void 0 : r.filter((h) => h.kind === 'method' && h.privacy !== 'private');
          return (
            (d == null ? void 0 : d.length) &&
              (a += `
          ## Properties
          ${w(d)}
        `),
            (i == null ? void 0 : i.length) &&
              (a += `
          ## Methods
          ${S(i)}
        `),
            (($ = s.events) == null ? void 0 : $.length) &&
              (a += `
          ## Events
          ${T(s.events)}
        `),
            ((g = s.slots) == null ? void 0 : g.length) &&
              (a += `
          ## Slots
          ${C(s.slots)}
        `),
            ((b = s.cssParts) == null ? void 0 : b.length) &&
              (a += `
          ## CSS Parts
          ${D(s.cssParts)}
        `),
            ((y = s.cssProperties) == null ? void 0 : y.length) &&
              (a += `
          ## CSS Custom Properties
          ${E(s.cssProperties)}
        `),
            a.replace(/^ +| +$/gm, '')
          );
        }));
    }
    t(e);
  }),
    m.doneEach(function () {
      [...document.querySelector('.content').querySelectorAll('table')].map((o) => {
        o.outerHTML = `
        <div class="table-wrap">
          ${o.outerHTML}
        </div>
      `;
      });
    });
});
