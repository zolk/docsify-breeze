window.$docsify.plugins.push((hook) => {
  // Modifies the pagination plugin to change its position in the DOM.
  hook.doneEach(function () {
    const oldPagination = document.querySelector(
      ".content > .docsify-pagination-container"
    );
    const newPagination = document.querySelector(
      ".docsify-pagination-container"
    );
    const content = document.querySelector(".content");

    if (oldPagination) {
      oldPagination.remove();
    }

    content.appendChild(newPagination);
  });
});
