import { css } from 'lit';

export default css`
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
