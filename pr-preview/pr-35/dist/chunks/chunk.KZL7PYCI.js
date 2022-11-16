import {
  __decorateClass,
  base_styles_default,
  n,
  p,
  r,
  s,
  t
} from "./chunk.QLNHEM6H.js";

// src/components/card/card.styles.ts
var card_styles_default = r`
  .card {
    background-color: var(--ds-color-white);
    border: 1px solid var(--ds-color-cool-gray-200);
    border-radius: var(--border-radius, var(--ds-border-radius-large));
  }

  .card--has-header .card__header {
    padding: var(--ds-spacing-large);
    border-bottom: 1px solid var(--ds-color-cool-gray-200);
    color: var(--ds-color-secondary-text);
    font-size: var(--ds-font-size-18);
    font-weight: var(--ds-font-weight-medium);
  }

  .card__body {
    padding: var(--ds-spacing-medium) var(--ds-spacing-large);
  }
`;

// src/components/card/card.ts
var DsCard = class extends s {
  constructor() {
    super(...arguments);
    this.hasHeader = false;
  }
  handleSlotChange() {
    this.hasHeader = this.querySelector(':scope > [slot="header"]') !== null;
  }
  render() {
    return p`
      <div part="base" class="card ${this.hasHeader ? "card--has-header" : ""}">
        <div part="header" class="card__header">
          <slot name="header" @slotchange=${this.handleSlotChange}></slot>
        </div>
        <div part="body" class="card__body">
          <slot></slot>
        </div>
      </div>
    `;
  }
};
DsCard.styles = [base_styles_default, card_styles_default];
__decorateClass([
  t()
], DsCard.prototype, "hasHeader", 2);
DsCard = __decorateClass([
  n("ds-card")
], DsCard);

export {
  DsCard
};
