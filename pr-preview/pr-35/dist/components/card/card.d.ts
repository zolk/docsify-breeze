import { LitElement } from 'lit';
/**
 * Cards can be used to group related subjects in a container.
 *
 * @status ready
 *
 * @slot - Body of the card.
 * @slot header - Optional header for the card.
 *
 * @csspart base - The component's base wrapper.
 * @csspart header - The card's header, if present.
 * @csspart body - The card's body.
 *
 * @cssproperty --border-radius - Customize the card's border radius.
 */
export default class DsCard extends LitElement {
    static styles: import("lit").CSSResult[];
    private hasHeader;
    handleSlotChange(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-card': DsCard;
    }
}
