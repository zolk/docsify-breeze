import { css } from 'lit';

export default css`
  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    border-style: solid;
    border-width: var(--ds-input-border-width);
    font-family: var(--ds-font-family-body);
    font-weight: var(--ds-font-weight-medium);
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    transition: var(--ds-transition-fast) all;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    &.button--disabled {
      opacity: 0.5;
      cursor: not-allowed;

      * {
        pointer-events: none;
      }
    }
  }

  /*
  * variant modifiers
  */

  :host([variant='default']) .button {
    background-color: var(--ds-color-white);
    border-color: var(--ds-color-cool-gray-300);
    box-shadow: var(--ds-shadow-x-small);
    color: var(--ds-color-cool-gray-800);

    &:hover:not(.button--disabled) {
      background-color: var(--ds-color-cool-gray-50);
      border-color: var(--ds-color-cool-gray-400);
    }

    &:focus:not(.button--disabled) {
      background-color: var(--ds-color-cool-gray-50);
      border-color: var(--ds-focus-border-color);
      box-shadow: var(--ds-focus-shadow);
    }

    &:active:not(.button--disabled) {
      background-color: var(--ds-color-cool-gray-50);
      border-color: var(--ds-color-cool-gray-400);
      color: var(--ds-color-cool-gray-900);
    }
  }

  :host([variant='primary']) .button {
    background-color: var(--ds-color-primary);
    border-color: var(--ds-color-primary);
    box-shadow: $var(--ds-shadow-x-small);
    color: var(--ds-color-white);

    &:hover:not(.button--disabled) {
      background-color: var(--ds-color-primary-hover);
      border-color: var(--ds-color-primary-hover);
      color: var(--ds-color-white);
    }

    &:focus:not(.button--disabled) {
      background-color: var(--ds-color-primary-hover);
      border-color: var(--ds-color-primary-hover);
      color: var(--ds-color-white);
      box-shadow: var(--ds-focus-shadow);
    }

    &:active:not(.button--disabled) {
      background-color: var(--ds-color-primary);
      border-color: var(--ds-color-primary);
      color: var(--ds-color-white);
    }
  }

  :host([variant='success']) .button {
    background-color: var(--ds-color-success);
    border-color: var(--ds-color-success);
    box-shadow: var(--ds-shadow-x-small);
    color: var(--ds-color-white);

    &:hover:not(.button--disabled) {
      background-color: var(--ds-color-success-hover);
      border-color: var(--ds-color-success-hover);
      color: var(--ds-color-white);
    }

    &:focus:not(.button--disabled) {
      background-color: var(--ds-color-success-hover);
      border-color: var(--ds-color-success-hover);
      color: var(--ds-color-white);
      box-shadow: 0 0 0 3px var(--ds-color-success-focus);
    }

    &:active:not(.button--disabled) {
      background-color: var(--ds-color-success);
      border-color: var(--ds-color-success);
      color: var(--ds-color-white);
    }
  }

  :host([variant='info']) .button {
    background-color: var(--ds-color-secondary);
    border-color: var(--ds-color-secondary);
    box-shadow: var(--ds-shadow-x-small);
    color: var(--ds-color-white);

    &:hover:not(.button--disabled) {
      background-color: var(--ds-color-secondary-hover);
      border-color: var(--ds-color-secondary-hover);
      color: var(--ds-color-white);
    }

    &:focus:not(.button--disabled) {
      background-color: var(--ds-color-secondary-hover);
      border-color: var(--ds-color-secondary-hover);
      color: var(--ds-color-white);
      box-shadow: 0 0 0 3px var(--ds-color-secondary-focus);
    }

    &:active:not(.button--disabled) {
      background-color: var(--ds-color-secondary);
      border-color: var(--ds-color-secondary);
      color: var(--ds-color-white);
    }
  }

  :host([variant='warning']) .button {
    background-color: var(--ds-color-warning);
    border-color: var(--ds-color-warning);
    box-shadow: var(--ds-shadow-x-small);
    color: var(--ds-color-white);

    &:hover:not(.button--disabled) {
      background-color: var(--ds-color-warning-hover);
      border-color: var(--ds-color-warning-hover);
      color: var(--ds-color-white);
    }

    &:focus:not(.button--disabled) {
      background-color: var(--ds-color-warning-hover);
      border-color: var(--ds-color-warning-hover);
      color: var(--ds-color-white);
      box-shadow: 0 0 0 3px var(--ds-color-warning-focus);
    }

    &:active:not(.button--disabled) {
      background-color: var(--ds-color-warning);
      border-color: var(--ds-color-warning);
      color: var(--ds-color-white);
    }
  }

  :host([variant='danger']) .button {
    background-color: var(--ds-color-danger);
    border-color: var(--ds-color-danger);
    box-shadow: var(--ds-shadow-x-small);
    color: var(--ds-color-white);

    &:hover:not(.button--disabled) {
      background-color: var(--ds-color-danger-hover);
      border-color: var(--ds-color-danger-hover);
      color: var(--ds-color-white);
    }

    &:focus:not(.button--disabled) {
      background-color: var(--ds-color-danger-hover);
      border-color: var(--ds-color-danger-hover);
      color: var(--ds-color-white);
      box-shadow: 0 0 0 3px var(--ds-color-danger-focus);
    }

    &:active:not(.button--disabled) {
      background-color: var(--ds-color-danger);
      border-color: var(--ds-color-danger);
      color: var(--ds-color-white);
    }
  }

  :host([variant='text']) .button {
    background-color: transparent;
    border-color: transparent;
    color: var(--ds-color-primary);

    &:hover:not(.button--disabled) {
      background-color: transparent;
      border-color: transparent;
      color: var(--ds-color-primary-hover);
    }

    &:focus:not(.button--disabled) {
      background-color: transparent;
      border-color: transparent;
      color: var(--ds-color-primary-hover);
      box-shadow: 0 0 0 3px var(--ds-color-primary-focus);
    }

    &:active:not(.button--disabled) {
      background-color: transparent;
      border-color: transparent;
      color: var(--ds-color-primary);
    }
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
