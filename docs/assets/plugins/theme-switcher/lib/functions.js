/*
 * Copyright (c) 2021 Kevin Zolkiewicz.
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { themes, pathRegex } = window.$docsify.themeSelector;

function setTheme(newTheme) {
  localStorage.setItem("theme", newTheme);
  themes.forEach((theme) =>
    document.body.classList.toggle(theme.class, theme.class === newTheme)
  );
}

function renderThemeSelect() {
  const themeSelect = document.createElement("select");
  themeSelect.id = "theme-switcher__select";
  themes?.forEach(
    (theme) =>
      (themeSelect.innerHTML += `<option value=${theme.class}>${theme.name}</option`)
  );
  themeSelect.value = getActiveTheme();
  themeSelect.onchange = () => {
    setTheme(themeSelect.value);
  };

  return themeSelect;
}

function showSelector(pathRegex) {
  if (pathRegex) {
    if (document.body.dataset.page.match(pathRegex)) return true;
  } else {
    return true;
  }
}

export function getActiveTheme() {
  return localStorage.getItem("theme") || (themes && themes[0].class);
}

export function renderThemeSwitcher() {
  const wrapper = document.createElement("div");
  wrapper.classList.add("theme-switcher");
  wrapper.innerHTML = `<label for="theme-switcher__select">Select Theme</label>`;
  wrapper.append(renderThemeSelect());

  return wrapper;
}

export function setVisibility(el) {
  el.style.visibility = showSelector(pathRegex) ? "visible" : "hidden";
}
