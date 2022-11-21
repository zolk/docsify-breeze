import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './card.styles';
import baseStyles from '../../lib/base-styles';
import { hasNamedSlot } from '../../lib/utils/slot';

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

  render() {
    return html`
      <div part="base">
        ${hasNamedSlot(this, 'header')
          ? html`
              <div part="header">
                <slot name="header"></slot>
              </div>
            `
          : ''}
        <div part="body">
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
