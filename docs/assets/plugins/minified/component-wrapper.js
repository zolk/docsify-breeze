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
      e.map((s) => {
        var l;
        const r = (l = s.parameters) == null ? void 0 : l.length;
        t += `
        <h3><code>${s.name}(${
          r
            ? s.parameters
                .map((n) => `${n.name}${n.optional ? '?' : ''}: ${n.type.text}`)
                .join(', ')
            : ''
        }) => ${s.return ? s.return.type.text : 'void'}</code></h3>
        <p>${s.description}</p>

        ${
          r
            ? `
              <dl class="method-list">
              ${s.parameters.map((n) =>
                n.description ? `<dt><code>${n.name}</code></dt><dd>${n.description}</dd>` : ''
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
          </tr>
        </thead>
        <tbody>
          ${e
            .map(
              (t) => `
                <tr>
                  <th scope="row">
                    <code>${t.name}</code>
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
    var s;
    const t = [];
    return (
      (s = e.modules) == null ||
        s.map((r) => {
          var l;
          (l = r.declarations) == null ||
            l.map((n) => {
              n.customElement && t.push(n);
            });
        }),
      t
    );
  }
  function H(e, t) {
    return j(e).find((s) => s.tagName === t);
  }
  m.beforeEach(async function (e, t) {
    const s = await P,
      r = document.body.dataset.page.split('/'),
      l = r[1] === 'components',
      n = document.querySelector('.content > .markdown-header');
    if ((n && n.remove(), l)) {
      const u = r[2],
        f = r[3],
        o = H(s, v + u),
        A = await fetch(`/components/${u}/usage.md`, { method: 'HEAD' }).then((c) => c);
      (e = e.replace(/^#{1} ([a-zA-Z]+)/, (c, a) => {
        let d = '';
        A.ok &&
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
            <h1>${a}</h1>
            ${
              (o == null ? void 0 : o.status) &&
              `<div class="status status--${o == null ? void 0 : o.status}">${
                o == null ? void 0 : o.status
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
        (e = e.replace(/^#> (.+)/gm, (c, a) =>
          `<p class="headline">${a}</p>`.replace(/^ +| +$/gm, '')
        )),
        (e = e.replace(/\[component-metadata\]/, () => {
          var p, $, g, b, y;
          let c = '';
          const a =
              (p = o.members) == null
                ? void 0
                : p.filter((h) => h.description && h.privacy !== 'private'),
            d = a == null ? void 0 : a.filter((h) => h.kind === 'field'),
            i =
              a == null ? void 0 : a.filter((h) => h.kind === 'method' && h.privacy !== 'private');
          return (
            (d == null ? void 0 : d.length) &&
              (c += `
          ## Properties
          ${w(d)}
        `),
            (i == null ? void 0 : i.length) &&
              (c += `
          ## Methods
          ${S(i)}
        `),
            (($ = o.events) == null ? void 0 : $.length) &&
              (c += `
          ## Events
          ${T(o.events)}
        `),
            ((g = o.slots) == null ? void 0 : g.length) &&
              (c += `
          ## Slots
          ${C(o.slots)}
        `),
            ((b = o.cssParts) == null ? void 0 : b.length) &&
              (c += `
          ## CSS Parts
          ${D(o.cssParts)}
        `),
            ((y = o.cssProperties) == null ? void 0 : y.length) &&
              (c += `
          ## CSS Custom Properties
          ${E(o.cssProperties)}
        `),
            c.replace(/^ +| +$/gm, '')
          );
        }));
    }
    t(e);
  }),
    m.doneEach(function () {
      [...document.querySelector('.content').querySelectorAll('table')].map((s) => {
        s.outerHTML = `
        <div class="table-wrap">
          ${s.outerHTML}
        </div>
      `;
      });
    });
});
