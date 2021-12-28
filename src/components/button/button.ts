import { LitElement, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement, property, query } from 'lit/decorators.js';
import styles from './button.styles';

/**
 * @status draft
 *
 * @slot - Text of the button.
 *
 * @event ds-blur - Emitted when the button loses focus.
 * @event ds-focus - Emitted when the button gains focus.
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The button's label.
 *
 * @cssproperty --border-radius - The button's border radius.
 */
@customElement('ds-button')
export default class DsButton extends LitElement {
  static styles = styles;

  @query('.button') button: HTMLButtonElement | HTMLLinkElement;

  /** The button's visual style. */
  @property({ reflect: true })
  variant:
    | 'default'
    | 'primary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'text' = 'default';

  /** The button's size. */
  @property({ reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  /** Set to true to render the button in a disabled state. */
  @property({ type: Boolean })
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
  target?: '_blank' | '_parent' | '_self' | '_top';

  /** Programmatically simulates a click on the button. */
  click() {
    this.button.click();
  }

  /** Programmatically move focus to the button.
   *
   * @param options - An objet which controls aspects of the focusing process.
   */
  focus(options?: FocusOptions) {
    this.button.focus(options);
  }

  /** Programmatically remove focus from the button. */
  blur() {
    this.button.blur();
  }

  render() {
    const isLink = this.href ? true : false;

    const innerContent = html`
      <span part="label" class="button__label">
        <slot></slot>
      </span>
    `;

    if (isLink) {
      return html`
        <a
          part="base"
          class="button"
          href=${ifDefined(this.href)}
          target=${ifDefined(this.target)}
          role="button"
          aria-disabled=${this.disabled ? 'true' : 'false'}
          tabindex=${this.disabled ? '-1' : '0'}
        >
          ${innerContent}
        </a>
      `;
    } else {
      return html`
        <button
          part="base"
          class="button"
          ?disabled=${this.disabled}
          type=${this.submit ? 'submit' : 'button'}
          name=${ifDefined(this.name)}
          value=${ifDefined(this.value)}
        >
          ${innerContent}
        </button>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-button': DsButton;
  }
}
