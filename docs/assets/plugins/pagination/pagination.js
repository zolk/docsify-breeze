function movePagination(hook) {
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
}

if (window) {
  window.$docsify.plugins = [].concat(
    window.$docsify.plugins || [],
    movePagination
  );
}
