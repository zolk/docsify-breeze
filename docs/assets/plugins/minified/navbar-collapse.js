window.$docsify.plugins.push((a) => {
  a.doneEach(() => {
    Array.from(document.querySelectorAll('main > .sidebar > .sidebar-nav > ul > li')).forEach(
      (s) => {
        s.querySelector('ul') &&
          (s.classList.add('has-submenu'),
          s.querySelector('a').addEventListener('click', () => {
            s.classList.toggle('collapse');
          }));
        const e = s.querySelector('li.active');
        e && (s.classList.add('active-child'), e.classList.add('active-child'));
      }
    );
  });
});
