window.$docsify.plugins.push((o) => {
  o.doneEach(function () {
    const n = document.querySelector('.content > .docsify-pagination-container'),
      e = document.querySelector('.docsify-pagination-container'),
      t = document.querySelector('.content');
    n && n.remove(), t.appendChild(e);
  });
});
