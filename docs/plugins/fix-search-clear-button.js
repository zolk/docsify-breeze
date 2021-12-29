// Plugin
// =============================================================================
// Replaces docsify's "clear search" button:
// - Use a <button> element to allow focus
// - Add aria-label for screen readers
// - Improve icon by sizing properly and applying non-scaling-stroke effect
//
// Extracted from docsify-themeable
// https://github.com/jhildenbiddle/docsify-themeable
//
// MIT License
//
// Copyright (c) 2018 John Hildenbiddle
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
function fixSearchClearButton(hook) {
  hook.ready(function () {
    const oldButton = document.querySelector('.sidebar .search .clear-button');

    if (oldButton) {
      const newButton = document.createElement('button');

      newButton.className = 'clear-button';
      newButton.setAttribute('aria-label', 'Clear search');
      newButton.innerHTML = `
        <svg width="16" height="16" viewbox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
            <path stroke="white" stroke-width="1.5" d="M4.5,4.5,11.5,11.5" vector-effect="non-scaling-stroke"></path>
            <path stroke="white" stroke-width="1.5" d="M4.5,11.5,11.5,4.5" vector-effect="non-scaling-stroke"></path>
        </svg>
    `;

      oldButton.parentNode.replaceChild(newButton, oldButton);
    }
  });
}

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [fixSearchClearButton].concat(window.$docsify.plugins || []);
