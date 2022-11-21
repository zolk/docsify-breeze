import { css } from "lit";

export default css`
  [part="base"] {
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

  [part="base"]:hover:not(:disabled) {
    background-color: var(--background-color-hover);
    border-color: var(--border-color-hover);
  }

  [part="base"]:focus:not(:disabled) {
    background-color: var(--background-color-focus);
    border-color: var(--border-color-focus);
    box-shadow: var(--box-shadow-focus);
    outline: none;
  }

  [part="base"]:active:not(:disabled) {
    background-color: var(--background-color-active);
    border-color: var(--border-color-active);
    color: var(--color-active);
  }

  [part="base"]:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  [part="base"]:disabled * {
    pointer-events: none;
  }

  /*
  * variant modifiers
  */

  :host([variant="default"]) [part="base"] {
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

  :host([variant="primary"]) [part="base"] {
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

  :host([variant="success"]) [part="base"] {
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

  :host([variant="info"]) [part="base"] {
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

  :host([variant="warning"]) [part="base"] {
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

  :host([variant="danger"]) [part="base"] {
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

  :host([variant="text"]) [part="base"] {
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

  :host([size="small"]) [part="base"] {
    font-size: var(--ds-button-font-size-small);
    height: var(--ds-inputs-height-small);
    line-height: calc(
      var(--ds-input-height-small) - var(--ds-input-border-width) * 2
    );
    border-radius: var(--border-radius, var(--ds-border-radius-medium));
    padding: 0 var(--ds-spacing-medium);
  }

  :host([size="medium"]) [part="base"] {
    font-size: var(--ds-button-font-size-medium);
    height: var(--ds-input-height-medium);
    line-height: calc(
      var(--ds-input-height-medium) - var(--ds-input-border-width) * 2
    );
    border-radius: var(--border-radius, var(--ds-border-radius-medium));
    padding: 0 var(--ds-spacing-large);
  }

  :host([size="large"]) [part="base"] {
    font-size: var(--ds-button-font-size-large);
    height: var(--ds-input-height-large);
    line-height: calc(
      var(--ds-input-height-large) - var(--ds-input-border-width) * 2
    );
    border-radius: var(--border-radius, var(--ds-border-radius-large));
    padding: 0 var(--ds-spacing-x-large);
  }
`;
