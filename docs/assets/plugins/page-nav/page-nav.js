/*
 * Adds page-based navigation
 */
window.$docsify.plugins.push((hook) => {
  hook.doneEach(function () {
    const title = document.querySelector('.markdown-section h1');
    const sections = document.querySelectorAll('.markdown-section h2');
    const pageNav = document.createElement('div');
    pageNav.classList.add('page-nav');

    const ul = document.createElement('ul');
    sections.forEach((section) => {
      ul.innerHTML += `
        <li data-id="${section.firstChild.getAttribute('data-id')}">
          <a href="${section.firstChild.href}" >${section.textContent}</a>
        </li>`;
    });

    console.log(title);
    pageNav.appendChild(ul);
    title.after(pageNav);

    const highlight = () => {
      const anchors = document.querySelectorAll('.markdown-section h2');
      const windowTop = window.scrollY;
      let visibleHeaders = [];

      anchors.forEach((anchor) => {
        if (windowTop > anchor.offsetTop) {
          visibleHeaders.push(anchor);
        }
      });

      const activeId = [...visibleHeaders].pop()?.getAttribute('id');
      const prevActive = document.querySelector('.page-nav li.active');
      const nextActive = document.querySelector(`.page-nav li[data-id=${activeId}]`);

      if (prevActive !== nextActive) {
        prevActive?.classList.remove('active');
        nextActive?.classList.add('active');
      }
    };

    document.addEventListener('scroll', highlight);
  });
});
