window.$docsify.plugins.push((t) => {
  t.doneEach(() => {
    var l;
    Array.from(document.querySelectorAll('main > .sidebar > .sidebar-nav > ul > li')).forEach(
      (s) => {
        s.querySelector('ul') &&
          (s.classList.add('has-submenu'),
          s.querySelector('a').addEventListener('click', () => {
            s.classList.toggle('collapse');
          }));
        const a = s.querySelector('li.active');
        a && (s.classList.add('active-child'), a.classList.add('active-child'));
      }
    );
    const e = document.querySelector('.app-sub-sidebar .active-child');
    e == null || e.classList.remove('active-child'),
      (l = e == null ? void 0 : e.closest('li.has-submenu > ul > li')) == null ||
        l.classList.add('active-child'),
      document.querySelectorAll('.sidebar-nav > ul > li > .app-sub-sidebar a').forEach((s) => {
        s.addEventListener('click', (i) => {
          var a, c;
          (c = (a = i.target) == null ? void 0 : a.closest('.has-submenu')) == null ||
            c.classList.add('active-child');
        });
      });
  });
});
