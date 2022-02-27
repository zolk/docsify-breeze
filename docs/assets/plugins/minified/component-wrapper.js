window.$docsify.plugins.push((u) => {
  const g = 'ds-',
    y = fetch('/dist/custom-elements.json')
      .then((e) => e.json())
      .catch((e) => console.error(e));
  function v(e) {
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
  function P(e) {
    let t = '';
    return (
      e.map((o) => {
        var i;
        const r = (i = o.parameters) == null ? void 0 : i.length;
        t += `
        <h4><code>${o.name}(${
          r
            ? o.parameters
                .map((c) => `${c.name}${c.optional ? '?' : ''}: ${c.type.text}`)
                .join(', ')
            : ''
        }) => ${o.return ? o.return.type.text : 'void'}</code></h4>
        <p>${o.description}</p>

        ${
          r
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
  function w(e) {
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
              var o, r;
              return `
                <tr>
                  <th scope="row">
                    <code>${t.name}</code>
                  </th>
                  <td>${t.description}</td>
                  <td>${
                    ((o = t.type) == null ? void 0 : o.text)
                      ? `<code>${(r = t.type) == null ? void 0 : r.text}</code>`
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
  function S(e) {
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
  function T(e) {
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
    var o;
    const t = [];
    return (
      (o = e.modules) == null ||
        o.map((r) => {
          var i;
          (i = r.declarations) == null ||
            i.map((c) => {
              c.customElement && t.push(c);
            });
        }),
      t
    );
  }
  function j(e, t) {
    return E(e).find((o) => o.tagName === t);
  }
  u.beforeEach(async function (e, t) {
    const o = await y,
      r = document.body.dataset.page.split('/'),
      i = r[1] === 'components',
      c = document.querySelector('.content > .markdown-header');
    if ((c && c.remove(), i)) {
      const D = r[2].split('.')[0],
        s = j(o, g + D);
      (e = e.replace(/^#{1} ([a-zA-Z]+)/, (a, n) => {
        const d = document.createElement('header');
        return (
          d.classList.add('markdown-header', 'component-header'),
          (d.innerHTML = `
          <div class="section">Components</div>
          <div class="header-status">
            <h1>${n}</h1>
            ${
              (s == null ? void 0 : s.status) &&
              `<div class="status status--${s == null ? void 0 : s.status}">${
                s == null ? void 0 : s.status
              }</div>`
            }
          </div>
        `),
          document.querySelector('.content').prepend(d),
          '## Overview'.replace(/^ +| +$/gm, '')
        );
      })),
        (e = e.replace(/^#> (.+)/gm, (a, n) =>
          `<p class="headline">${n}</p>`.replace(/^ +| +$/gm, '')
        )),
        (e = e.replace(/\[component-metadata\]/, () => {
          var p, $, m, f, b;
          let a = '';
          const n =
              (p = s.members) == null
                ? void 0
                : p.filter((l) => l.description && l.privacy !== 'private'),
            d = n == null ? void 0 : n.filter((l) => l.kind === 'field'),
            h =
              n == null ? void 0 : n.filter((l) => l.kind === 'method' && l.privacy !== 'private');
          return (
            (d == null ? void 0 : d.length) &&
              (a += `
          ### Properties
          ${v(d)}
        `),
            (h == null ? void 0 : h.length) &&
              (a += `
          ### Methods
          ${P(h)}
        `),
            (($ = s.events) == null ? void 0 : $.length) &&
              (a += `
          ### Events
          ${w(s.events)}
        `),
            ((m = s.slots) == null ? void 0 : m.length) &&
              (a += `
          ### Slots
          ${S(s.slots)}
        `),
            ((f = s.cssParts) == null ? void 0 : f.length) &&
              (a += `
          ### CSS Parts
          ${T(s.cssParts)}
        `),
            ((b = s.cssProperties) == null ? void 0 : b.length) &&
              (a += `
          ### CSS Custom Properties
          ${C(s.cssProperties)}
        `),
            a.replace(/^ +| +$/gm, '')
          );
        }));
    }
    t(e);
  }),
    u.doneEach(function () {
      [...document.querySelector('.content').querySelectorAll('table')].map((o) => {
        o.outerHTML = `
        <div class="table-wrap">
          ${o.outerHTML}
        </div>
      `;
      });
    });
});
