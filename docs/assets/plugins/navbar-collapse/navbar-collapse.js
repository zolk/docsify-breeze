window.$docsify.plugins.push((hook) => {
  // Custom navigation collapsing support
  hook.doneEach(() => {
    const navbarItems = Array.from(
      document.querySelectorAll('main > .sidebar > .sidebar-nav > ul > li')
    );

    navbarItems.forEach((item) => {
      // Determine if nav item has sub menu
      const submenu = item.querySelector('ul');
      if (submenu) {
        item.classList.add('has-submenu');

        // Allow clicking on an active parent to collapse the sub menu
        const itemLink = item.querySelector('a');
        itemLink.addEventListener('click', () => {
          item.classList.toggle('collapse');
        });
      }

      // Determine if nav item has an active child
      const activeChild = item.querySelector('li.active');
      if (activeChild) {
        item.classList.add('active-child');
        activeChild.classList.add('active-child');
      }
    });

    // Fix a bug where an anchor link would not properly expand the navbar
    const activeAnchor = document.querySelector('.app-sub-sidebar .active-child');
    activeAnchor?.classList.remove('active-child');
    activeAnchor?.closest('li.has-submenu > ul > li')?.classList.add('active-child');

    // Fix a bug where clicking a sidebar anchor link for a top-level item would collapse the menu.
    const topLevelAnchors = document.querySelectorAll(
      '.sidebar-nav > ul > li > .app-sub-sidebar a'
    );

    topLevelAnchors.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.target?.closest('.has-submenu')?.classList.add('active-child');
      });
    });
  });
});
