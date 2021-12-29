window.$docsify.plugins.push((hook) => {
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
  });
});
