window.$docsify.plugins.push((s, t) => {
  s.ready(function () {
    const e = {
      primary: 'DS Starter',
      secondary: 'Design System Kit',
      logo: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clip-rule="evenodd" /></svg>',
      logoFill: '#000000',
      logoHref: '/',
    };
    t.config.siteTitle &&
      Object.keys(e).forEach((o) => {
        const l = t.config.siteTitle[o];
        typeof l == 'string' && (e[o] = l);
      });
    const i = document.createElement('a');
    (i.href = e.logoHref),
      i.classList.add('site-title'),
      (i.innerHTML = `
      <div class="site-title__logo" style="color: ${e.logoFill}">${e.logo}</div>
      <div class="site-title__name">
        <div class="site-title__primary">${e.primary}</div>
        <div class="site-title__secondary">${e.secondary}</div>
      </div>
    `);
    const r = document.querySelector('.sidebar'),
      a = document.querySelector('.sidebar h1.app-name');
    r.prepend(i), a.remove();
  });
});
