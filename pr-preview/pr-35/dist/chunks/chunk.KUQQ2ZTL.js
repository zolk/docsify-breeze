import {
  T,
  __decorateClass,
  base_styles_default,
  e,
  i,
  n,
  p,
  r,
  s,
  y
} from "./chunk.QLNHEM6H.js";

// node_modules/lit-html/static.js
var r2 = (t, ...e2) => ({ _$litStatic$: e2.reduce((e3, o, r3) => e3 + ((t2) => {
  if (t2._$litStatic$ !== void 0)
    return t2._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t2}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(o) + t[r3 + 1], t[0]) });
var i2 = /* @__PURE__ */ new Map();
var a = (t) => (e2, ...o) => {
  var r3;
  const a2 = o.length;
  let l3, s3;
  const n2 = [], u = [];
  let c, $ = 0, v = false;
  for (; $ < a2; ) {
    for (c = e2[$]; $ < a2 && (s3 = o[$], l3 = (r3 = s3) === null || r3 === void 0 ? void 0 : r3._$litStatic$) !== void 0; )
      c += l3 + e2[++$], v = true;
    u.push(s3), n2.push(c), $++;
  }
  if ($ === a2 && n2.push(e2[a2]), v) {
    const t2 = n2.join("$$lit$$");
    (e2 = i2.get(t2)) === void 0 && i2.set(t2, e2 = n2), o = u;
  }
  return t(e2, ...o);
};
var l = a(p);
var s2 = a(y);

// node_modules/lit-html/directives/if-defined.js
var l2 = (l3) => l3 != null ? l3 : T;

// src/components/button/button.styles.ts
var button_styles_default = r`
  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    background-color: var(--background-color);
    border-color: var(--border-color);
    border-style: solid;
    border-width: var(--ds-input-border-width);
    box-shadow: var(--box-shadow);
    color: var(--color);
    font-family: var(--ds-font-family-body);
    font-weight: var(--ds-font-weight-medium);
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    transition: var(--ds-transition-fast) all;
    cursor: pointer;
  }

  .button:hover:not(.button--disabled) {
    background-color: var(--background-color-hover);
    border-color: var(--border-color-hover);
  }

  .button:focus:not(.button-disabled) {
    background-color: var(--background-color-focus);
    border-color: var(--border-color-focus);
    box-shadow: var(--box-shadow-focus);
    outline: none;
  }

  .button:active:not(.button--disabled) {
    background-color: var(--background-color-active);
    border-color: var(--border-color-active);
    color: var(--color-active);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .button--disabled * {
    pointer-events: none;
  }

  /*
  * variant modifiers
  */

  :host([variant='default']) .button {
    --background-color: var(--ds-color-white);
    --border-color: var(--ds-color-cool-gray-300);
    --box-shadow: var(--ds-shadow-x-small);
    --color: var(--ds-color-cool-gray-800);

    --background-color-hover: var(--ds-color-cool-gray-50);
    --border-color-hover: var(--ds-color-cool-gray-400);

    --background-color-focus: var(--ds-color-cool-gray-50);
    --border-color-focus: var(--ds-focus-border-color);
    --box-shadow-focus: var(--ds-focus-shadow);

    --background-color-active: var(--ds-color-cool-gray-50);
    --border-color-active: var(--ds-color-cool-gray-400);
    --color-active: var(--ds-color-cool-gray-900);
  }

  :host([variant='primary']) .button {
    --background-color: var(--ds-color-primary);
    --border-color: var(--ds-color-primary);
    --box-shadow: $var(--ds-shadow-x-small);
    --color: var(--ds-color-white);

    --background-color-hover: var(--ds-color-primary-hover);
    --border-color-hover: var(--ds-color-primary-hover);
    --color-hover: var(--ds-color-white);

    --background-color-focus: var(--ds-color-primary-hover);
    --border-color-focus: var(--ds-color-primary-hover);
    --color-focus: var(--ds-color-white);
    --box-shadow-focus: var(--ds-focus-shadow);

    --background-color-active: var(--ds-color-primary);
    --border-color-active: var(--ds-color-primary);
    --color-active: var(--ds-color-white);
  }

  :host([variant='success']) .button {
    --background-color: var(--ds-color-success);
    --border-color: var(--ds-color-success);
    --box-shadow: var(--ds-shadow-x-small);
    --color: var(--ds-color-white);

    --background-color-hover: var(--ds-color-success-hover);
    --border-color-hover: var(--ds-color-success-hover);
    --color-hover: var(--ds-color-white);

    --background-color-focus: var(--ds-color-success-hover);
    --border-color-focus: var(--ds-color-success-hover);
    --color-focus: var(--ds-color-white);
    --box-shadow-focus: 0 0 0 3px var(--ds-color-success-focus);

    --background-color-active: var(--ds-color-success);
    --border-color-active: var(--ds-color-success);
    --color-active: var(--ds-color-white);
  }

  :host([variant='info']) .button {
    --background-color: var(--ds-color-secondary);
    --border-color: var(--ds-color-secondary);
    --box-shadow: var(--ds-shadow-x-small);
    --color: var(--ds-color-white);

    --background-color-hover: var(--ds-color-secondary-hover);
    --border-color-hover: var(--ds-color-secondary-hover);
    --color-hover: var(--ds-color-white);

    --background-color-focus: var(--ds-color-secondary-hover);
    --border-color-focus: var(--ds-color-secondary-hover);
    --color-focus: var(--ds-color-white);
    --box-shadow-focus: 0 0 0 3px var(--ds-color-secondary-focus);

    --background-color-active: var(--ds-color-secondary);
    --border-color-active: var(--ds-color-secondary);
    --color-active: var(--ds-color-white);
  }

  :host([variant='warning']) .button {
    --background-color: var(--ds-color-warning);
    --border-color: var(--ds-color-warning);
    --box-shadow: var(--ds-shadow-x-small);
    --color: var(--ds-color-white);

    --background-color-hover: var(--ds-color-warning-hover);
    --border-color-hover: var(--ds-color-warning-hover);
    --color-hover: var(--ds-color-white);

    --background-color-focus: var(--ds-color-warning-hover);
    --border-color-focus: var(--ds-color-warning-hover);
    --color-focus: var(--ds-color-white);
    --box-shadow-focus: 0 0 0 3px var(--ds-color-warning-focus);

    --background-color-active: var(--ds-color-warning);
    --border-color-active: var(--ds-color-warning);
    --color-active: var(--ds-color-white);
  }

  :host([variant='danger']) .button {
    --background-color: var(--ds-color-danger);
    --border-color: var(--ds-color-danger);
    --box-shadow: var(--ds-shadow-x-small);
    --color: var(--ds-color-white);

    --background-color-hover: var(--ds-color-danger-hover);
    --border-color-hover: var(--ds-color-danger-hover);
    --color-hover: var(--ds-color-white);

    --background-color-focus: var(--ds-color-danger-hover);
    --border-color-focus: var(--ds-color-danger-hover);
    --color-focus: var(--ds-color-white);
    --box-shadow-focus: 0 0 0 3px var(--ds-color-danger-focus);

    --background-color-active: var(--ds-color-danger);
    --border-color-active: var(--ds-color-danger);
    --color-active: var(--ds-color-white);
  }

  :host([variant='text']) .button {
    --background-color: transparent;
    --border-color: transparent;
    --color: var(--ds-color-primary);

    --background-color-hover: transparent;
    --border-color-hover: transparent;
    --color-hover: var(--ds-color-primary-hover);

    --background-color-focus: transparent;
    --border-color-focus: transparent;
    --color-focus: var(--ds-color-primary-hover);
    --box-shadow-focus: 0 0 0 3px var(--ds-color-primary-focus);

    --background-color-active: transparent;
    --border-color-active: transparent;
    --color-active: var(--ds-color-primary);
  }

  /*
  * size modifiers
  */

  :host([size='small']) .button {
    font-size: var(--ds-button-font-size-small);
    height: var(--ds-inputs-height-small);
    line-height: calc(var(--ds-input-height-small) - var(--ds-input-border-width) * 2);
    border-radius: var(--border-radius, var(--ds-border-radius-medium));
    padding: 0 var(--ds-spacing-medium);
  }

  :host([size='medium']) .button {
    font-size: var(--ds-button-font-size-medium);
    height: var(--ds-input-height-medium);
    line-height: calc(var(--ds-input-height-medium) - var(--ds-input-border-width) * 2);
    border-radius: var(--border-radius, var(--ds-border-radius-medium));
    padding: 0 var(--ds-spacing-large);
  }

  :host([size='large']) .button {
    font-size: var(--ds-button-font-size-large);
    height: var(--ds-input-height-large);
    line-height: calc(var(--ds-input-height-large) - var(--ds-input-border-width) * 2);
    border-radius: var(--border-radius, var(--ds-border-radius-large));
    padding: 0 var(--ds-spacing-x-large);
  }
`;

// src/components/button/button.ts
var DsButton = class extends s {
  constructor() {
    super(...arguments);
    this.variant = "default";
    this.size = "medium";
    this.disabled = false;
  }
  click() {
    this.button.click();
  }
  focus(options) {
    this.button.focus(options);
  }
  blur() {
    this.button.blur();
  }
  _handleBlur(e2) {
    e2.stopPropagation();
    const event = new CustomEvent("blur", { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }
  _handleFocus(e2) {
    e2.stopPropagation();
    const event = new CustomEvent("focus", {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }
  render() {
    const isLink = this.href ? true : false;
    const tag = isLink ? r2`a` : r2`button`;
    return l`
      <${tag}
        part="base"
        class="button ${this.disabled ? "button--disabled" : ""}"
        ?disabled=${isLink ? void 0 : this.disabled}
        type=${l2(isLink ? void 0 : this.submit ? "submit" : "button")}
        name=${l2(isLink ? void 0 : this.name)}
        value=${l2(isLink ? void 0 : this.value)}
        href=${l2(this.href)}
        target=${l2(this.target)}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
        @focus=${this._handleFocus}
        @blur=${this._handleBlur}
      >
        <span part="label" class="button__label">
          <slot></slot>
        </span>
      </${tag}>
    `;
  }
};
DsButton.styles = [base_styles_default, button_styles_default];
__decorateClass([
  i(".button")
], DsButton.prototype, "button", 2);
__decorateClass([
  e({ reflect: true })
], DsButton.prototype, "variant", 2);
__decorateClass([
  e({ reflect: true })
], DsButton.prototype, "size", 2);
__decorateClass([
  e({ type: Boolean, reflect: true })
], DsButton.prototype, "disabled", 2);
__decorateClass([
  e()
], DsButton.prototype, "href", 2);
__decorateClass([
  e()
], DsButton.prototype, "name", 2);
__decorateClass([
  e()
], DsButton.prototype, "value", 2);
__decorateClass([
  e({ type: Boolean })
], DsButton.prototype, "submit", 2);
__decorateClass([
  e()
], DsButton.prototype, "target", 2);
DsButton = __decorateClass([
  n("ds-button")
], DsButton);

export {
  DsButton
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
