/* Copyright (c) 2022 Kevin Zolkiewicz.
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const customIcons = window.$docsify.componentViewer?.icons;

const { customResizer, customArrow, customWindow, customCustomize } =
  customIcons ?? [];

export const resizerIcon =
  customResizer ??
  `<svg
      width="11"
      height="16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M.586 3.414A2 2 0 1 0 3.414.586 2 2 0 0 0 .586 3.414ZM.586 9.414a2 2 0 1 0 2.828-2.828A2 2 0 0 0 .586 9.414ZM.586 15.414a2 2 0 1 0 2.828-2.828 2 2 0 0 0-2.828 2.828ZM7.586 3.414A2 2 0 1 0 10.414.586a2 2 0 0 0-2.828 2.828ZM7.586 9.414a2 2 0 1 0 2.828-2.828 2 2 0 0 0-2.828 2.828ZM7.586 15.414a2 2 0 1 0 2.828-2.828 2 2 0 0 0-2.828 2.828Z"
        fill="currentColor"
      />
    </svg>`;

export const arrowIcon =
  customArrow ??
  `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>`;

export const windowIcon =
  customWindow ??
  `<svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="11"
      viewBox="0 0 448 512"
    >
      <path
        d="M256 64c0-17.67 14.3-32 32-32h127.1c5.2 0 9.4.86 13.1 2.43 2.9 1.55 7.3 3.84 10.4 6.87 0 .05 0 .1.1.14 6.2 6.22 8.4 14.34 9.3 22.46V192c0 17.7-14.3 32-32 32s-32-14.3-32-32v-50.7L214.6 310.6c-12.5 12.5-32.7 12.5-45.2 0s-12.5-32.7 0-45.2L338.7 96H288c-17.7 0-32-14.33-32-32zM0 128c0-35.35 28.65-64 64-64h96c17.7 0 32 14.33 32 32 0 17.7-14.3 32-32 32H64v288h288v-96c0-17.7 14.3-32 32-32s32 14.3 32 32v96c0 35.3-28.7 64-64 64H64c-35.35 0-64-28.7-64-64V128z"
        fill="currentColor"
      />
    </svg> `;

export const controlsIcon =
  customCustomize ??
  `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
      />
    </svg>`;
