export const copyButtonTemplate = [
  '<button class="copy-code-button" aria-label="Copy Code">',
  '<svg xmlns="http://www.w3.org/2000/svg" class="copy-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" class="success-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>',
  "</button>",
].join("");

export function handleCopyClick(event) {
  const isCopyCodeButton = event.target.closest(".copy-code-button");

  if (isCopyCodeButton) {
    const button =
      event.target.tagName === "BUTTON"
        ? event.target
        : event.target.closest(".copy-code-button");
    const preElm = button.closest("pre");
    const codeElm = preElm.querySelector("code");

    const range = document.createRange();
    range.selectNode(codeElm);

    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    navigator.clipboard.writeText(selection).then(
      () => {
        button.classList.add("success");
        setTimeout(() => {
          button.classList.remove("success");
        }, 1000);
      },
      (err) => {
        console.error(`docsify-copy-code: ${err}`);

        button.classList.add("error");
        setTimeout(() => {
          button.classList.remove("error");
        }, 1000);
      }
    );

    selection = window.getSelection();

    if (typeof selection.removeRange === "function") {
      selection.removeRange(range);
    } else if (typeof selection.removeAllRanges === "function") {
      selection.removeAllRanges();
    }
  }
}
