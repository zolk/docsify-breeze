import { LitElement } from "lit";
import { html, literal } from "lit/static-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { customElement, property, query } from "lit/decorators.js";
import styles from "./button.styles";
import baseStyles from "../../lib/base-styles";

/**
 * Buttons represent actions available to the user.
 *
 * @status ready
 *
 * @slot - Text of the button.
 *
 * @event blur - Emitted when the button loses focus.
 * @event focus - Emitted when the button gains focus.
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The button's label.
 *
 * @cssproperty --border-radius - The button's border radius.
 */
@customElement("ds-button")
export default class DsButton extends LitElement {
  static styles = [baseStyles, styles];

  @query(".button") button: HTMLButtonElement | HTMLLinkElement;

  /** The button's visual style. */
  @property({ reflect: true })
  variant:
    | "default"
    | "primary"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "text" = "default";

  /** The button's size. */
  @property({ reflect: true })
  size: "small" | "medium" | "large" = "medium";

  /** Set to true to render the button in a disabled state. */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** When set, the underlying element will render as an `a` rather than a `button`. */
  @property()
  href: string;

  /** An optional name for the button. Ignored when `href` is set. */
  @property()
  name: string;

  /** An optional value for the button. Ignored when `href` is set. */
  @property()
  value: string;

  /** Indicates if activating the button should submit the form. Ignored when `href` is set. */
  @property({ type: Boolean })
  submit: boolean;

  /** Specifies where a link should open. Only used when `href` is set. */
  @property()
  target?: "_blank" | "_parent" | "_self" | "_top";

  /** Programmatically simulates a click on the button. */
  click() {
    this.button.click();
  }

  /** Programmatically move focus to the button.
   *
   * @param options - An object which controls aspects of the focusing process.
   */
  focus(options?: FocusOptions) {
    this.button.focus(options);
  }

  /** Programmatically remove focus from the button. */
  blur() {
    this.button.blur();
  }

  private _handleBlur(e: KeyboardEvent) {
    e.stopPropagation();

    const event = new CustomEvent("blur", { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }

  private _handleFocus(e: KeyboardEvent) {
    e.stopPropagation();

    const event = new CustomEvent("focus", {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    const isLink = this.href ? true : false;
    const tag = isLink ? literal`a` : literal`button`;

    return html`
      <${tag}
        part="base"
        class="button ${this.disabled ? "button--disabled" : ""}"
        ?disabled=${isLink ? undefined : this.disabled}
        type=${ifDefined(
          isLink ? undefined : this.submit ? "submit" : "button"
        )}
        name=${ifDefined(isLink ? undefined : this.name)}
        value=${ifDefined(isLink ? undefined : this.value)}
        href=${ifDefined(this.href)}
        target=${ifDefined(this.target)}
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
}

declare global {
  interface HTMLElementTagNameMap {
    "ds-button": DsButton;
  }
}
