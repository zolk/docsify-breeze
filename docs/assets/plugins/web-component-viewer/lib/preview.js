/* Copyright (c) 2021 Kevin Zolkiewicz.
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { controlsIcon, windowIcon, resizerIcon, arrowIcon } from "./icons.js";

export function renderPreview(codeBlock, id) {
  const pre = codeBlock.closest("pre");
  const isExpanded = codeBlock.classList.contains("expanded");
  const showControls = [...codeBlock.classList].filter((e) =>
    e.startsWith("controls")
  ).length;
  const sourceId = "code-source-" + id;

  // Determine slot
  const lastClass = [...codeBlock.classList].pop();
  const hasSlug = !["preview", "expanded", "controls"].includes(lastClass);
  const getSlug = () => (hasSlug ? lastClass : id);
  const exampleId = "example-" + getSlug();

  // Controls button
  const controlsBtn = `
    <div class="code-preview__controls">
      <a href="?controls=${getSlug()}" target="_blank">
        ${controlsIcon}
        Customize
      </a>
    </div>
  `;

  // Preview button
  const previewBtn = `
    <div class="code-preview__new-window">
      <a href="?preview=${getSlug()}" target="_blank">
        ${windowIcon}
        Open in New Window
      </a>
    </div>
  `;

  // Preview UI
  const previewInterface = `
    <div class="code-preview ${isExpanded ? "code-preview--expanded" : ""}">
      <div class="code-preview__preview" id=${exampleId}>
        ${codeBlock.textContent}
        <div
          class="code-preview__resizer"
          aria-controls="${exampleId}"
          role="slider"
          tabindex="0"
        >
          ${resizerIcon}
        </div>
      </div>
      <div class="code-preview__source" id=${sourceId}>${pre.outerHTML}</div>
      <div class="code-preview__actions">
        <button
          class="code-preview__toggle"
          aria-expanded="${isExpanded ? "true" : "false"}"
          aria-controls="${sourceId}"
        >
          ${arrowIcon}
          <span>
            ${isExpanded ? "Hide " : "Show"} Code
          </span>
        </button>
        <div class="code-preview__actions-buttons">
          ${hasSlug ? previewBtn : ""}
          ${hasSlug && showControls ? controlsBtn : ""}
        </div>
      </div>
    </div>
  `;

  return previewInterface;
}

export function handlePreviewResize(preview, resizer) {
  let startX;
  let startWidth;

  const getStart = (event) => {
    startX = event.changedTouches
      ? event.changedTouches[0].pageX
      : event.clientX;
    startWidth = parseInt(
      document.defaultView.getComputedStyle(preview).width,
      10
    );
  };

  const setWidth = (newWidth) => {
    preview.style.width = `${startWidth + newWidth}px`;
  };

  const mouseDownHandler = (event) => {
    resizer.classList.add("code-preview__resizer--resizing");
    event.preventDefault();
    getStart(event);

    document.addEventListener("mousemove", startDrag);
    document.addEventListener("touchmove", startDrag);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchend", stopDrag);
  };

  const keyDownHandler = (event) => {
    getStart(event);

    if (
      [
        "ArrowDown",
        "ArrowLeft",
        "ArrowUp",
        "ArrowRight",
        "Home",
        "End",
        "PageUp",
        "PageDown",
      ].includes(event.key)
    ) {
      event.preventDefault();

      switch (event.key) {
        case "ArrowLeft":
        case "ArrowDown":
          setWidth(-10);
          break;
        case "ArrowRight":
        case "ArrowUp":
          setWidth(10);
          break;
        case "PageUp":
          setWidth(100);
          break;
        case "PageDown":
          setWidth(-100);
          break;
        case "Home":
          setWidth(-startWidth);
          break;
        case "End":
          setWidth(10000);
          break;
      }
    }
  };

  const startDrag = (event) => {
    const newX = event.clientX - startX;
    setWidth(newX);
  };

  const stopDrag = () => {
    resizer.classList.remove("code-preview__resizer--resizing");
    document.removeEventListener("mousemove", startDrag);
    document.removeEventListener("touchmove", startDrag);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchend", stopDrag);
  };

  resizer.addEventListener("mousedown", mouseDownHandler);
  resizer.addEventListener("touchstart", mouseDownHandler);
  resizer.addEventListener("keydown", keyDownHandler);
}

export function handleCodeToggle(event) {
  const button = event.target.closest(".code-preview__toggle");

  if (button) {
    const codePreview = event.target.closest(".code-preview");
    codePreview.classList.toggle("code-preview--expanded");

    const isExpanded = codePreview.classList.contains("code-preview--expanded");
    event.target.setAttribute("aria-expanded", isExpanded);
    button.querySelector("span").innerText = `${
      isExpanded ? "Hide " : "Show"
    } Code`;
  }
}
