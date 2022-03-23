import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import styles from './card.styles';
import baseStyles from '../../lib/base-styles';

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
@customElement('ds-card')
export default class DsCard extends LitElement {
  static styles = [baseStyles, styles];

  @state() private hasHeader = false;

  handleSlotChange() {
    this.hasHeader = this.querySelector(':scope > [slot="header"]') !== null;
  }

  render() {
    return html`
      <div part="base" class="card ${this.hasHeader ? 'card--has-header' : ''}">
        <div part="header" class="card__header">
          <slot name="header" @slotchange=${this.handleSlotChange}></slot>
        </div>
        <div part="body" class="card__body">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-card': DsCard;
  }
}
