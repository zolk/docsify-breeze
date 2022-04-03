# Usage

This component library is built using
[Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components).
Web Components are a set of web platform APIs that allow for fully encapsulated
reusable custom elements. Web Components consist of three separate APIs:

- **Custom elements.** The ability to create custom HTML elements, such as
  `ds-button`. All custom elements must include a dash in their name; thus,
  it is common practice to include a prefix in the tag name.
- **Shadow DOM.** Allows Web Components to live in an encapsulated “shadow” DOM
  rendered separately from the main DOM. Shadow DOM allows for complete
  encapsulation of both JavaScript and CSS.
- **HTML templates.** Refers to the markup templates rendered by a Web Component.

## Rendering a Component

A page can render a component simply by including the tag name:

```html
<ds-button>My Button</ds-button>
```

This will render a fully-styled, encapsulated, and accessible button. No custom
classes or manual styling required.

**Note:** Components cannot have self-closing tags; you must always
include a full closing tag.

## Properties

Most components offer a variety of properties, or "props," that can modify
appearance or behavior. You can set properties by applying attributes to the
component tag. For example, buttons accept a `variant` prop that controls the
overall style of the button:

```html
<ds-button variant="secondary">Secondary Button</ds-button>
```

Some properties are booleans. The inclusion of the property sets the value to
true, while its exclusion sets its value to false.

```html
<ds-button disabled>Disabled Button</ds-button>
```

Refer to each component's documentation for a complete list of available
properties.

## Slots

Most components have slots to accept content. There are two types of slots:
default slots and named slots.

Default slots require no special treatment and refer to any content placed
between the element tag that doesn't have a `slot` attribute. For example, a
button's default slot will set its label:

```html
<ds-button>Button Label</ds-button>
```

Some components may offer named slots. For example, a card component might offer
a named slot for specifying the card's image. This slot can be populated using
the `slot` attribute on a child element:

```html
<ds-card>
  <img
    slot="image"
    src="https://placekitten.com/200/139"
    alt="A kitten on a window ledge stares into the camera."
  />
  Content for a card.
</ds-card>
```

The position of a named slot is not relevant; you can place it anywhere inside
the component.

Refer to each component's documentation for a complete list of available
properties.

## Methods

Components may have methods for triggering various behavior programmatically.
For example, a button might offer a `focus()` method for setting focus on the
element:

```html
<ds-button>Button</ds-button>

<script>
  const button = document.querySelector('ds-button');

  button.focus();
</script>
```

Refer to each component's documentation for a complete list of available methods.

## Events

Each component will emit standard events such as `click`, `mouseover`, etc.
In addition, some components may emit custom events. For example, an accordion
might emit an event when it is opened:

```html
<ds-accordion>
  <h3 slot="headline">Accordion Name</h3>
  Accordion content.
</ds-accordion>

<script>
  const accordion = document.querySelector('ds-accordion');

  accordion.addEventListener('ds-show', () => {
    console.log('Accordion has been opened.');
  });
</script>
```

Refer to each component's documentation for a complete list of available events.
