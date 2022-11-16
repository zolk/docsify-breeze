import { LitElement } from 'lit';
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
export default class DsButton extends LitElement {
    static styles: import("lit").CSSResult[];
    button: HTMLButtonElement | HTMLLinkElement;
    /** The button's visual style. */
    variant: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text';
    /** The button's size. */
    size: 'small' | 'medium' | 'large';
    /** Set to true to render the button in a disabled state. */
    disabled: boolean;
    /** When set, the underlying element will render as an `a` rather than a `button`. */
    href: string;
    /** An optional name for the button. Ignored when `href` is set. */
    name: string;
    /** An optional value for the button. Ignored when `href` is set. */
    value: string;
    /** Indicates if activating the button should submit the form. Ignored when `href` is set. */
    submit: boolean;
    /** Specifies where a link should open. Only used when `href` is set. */
    target?: '_blank' | '_parent' | '_self' | '_top';
    /** Programmatically simulates a click on the button. */
    click(): void;
    /** Programmatically move focus to the button.
     *
     * @param options - An object which controls aspects of the focusing process.
     */
    focus(options?: FocusOptions): void;
    /** Programmatically remove focus from the button. */
    blur(): void;
    private _handleBlur;
    private _handleFocus;
    render(): import("lit-html").TemplateResult<1 | 2>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-button': DsButton;
    }
}
