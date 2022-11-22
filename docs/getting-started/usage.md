# Usage

#> This library uses Web Components, a set of technologies that provide a standards-based component model for the web.

[Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
are an excellent choice for any design system because they:

- Are tech agnostic and work with any framework or no framework whatsoever.
- Provide a future-proof architecture for building components based on Web Standards.
- Enable native encapsulation of style and behavior.

## Rendering a Component

Web components behave like any standard HTML element. To render a component,
simply include its tag:

```html preview expanded rendering
<ds-button>My Button</ds-button>
```

One difference from standard HTML elements is that web components must always
include a closing tag. Self-closing tags are not allowed.

```html
❌ <ds-separator />

✅ <ds-separator></ds-separator>
```

## Properties

Web components offer attributes in HTML and properties in JavaScript. Property
names are always camelCase, while attribute names are kebab-case. You can set
most attributes as you would any standard HTML attribute.

```html preview expanded properties
<ds-button variant="primary" disabled>Disabled Button</ds-button>
```

The above example sets both string and boolean attributes. The presence of a
boolean attribute indicates a `true` value, while its absence indicates a
`false` value.

In rare cases, a component property may accept an object or function. Setting
these values is not permitted in HTML attributes, so we must instead use
JavaScript to set these properties.

```html
<sample-list></sample-list>

<script>
  const list = document.querySelector("sample-list");

  list.listItems = [
    { name: "Milk", completed: true },
    { name: "Butter", completed: false },
    { name: "Bread", completed: false },
  ];
</script>
```

## Slots

Most components offer slots for passing child elements in a composable manner.
The most common slot is the default slot, which includes any element that does not
contain a `slot` attribute.

```html preview expanded default-slot
<ds-card>
  <p>This is the default slot for a card.</p>
</ds-card>
```

Some components offer named slots. Elements can be passed to these slots using
the `slot` attribute.

```html preview expanded named-slot
<ds-card>
  <div slot="header">This is the header slot for a card.</div>
  <p>This is the default slot for a card.</p>
</ds-card>
```

The position of a named slot inside the component is not important. The
component will render the slot in the correct location automatically.

## Methods

Many components offer methods for programmatically triggering specific behavior.

```html preview expanded methods
<ds-button id="trigger">Focus the primary button</ds-button>
<ds-button id="action" variant="primary">Primary button</ds-button>

<script>
  const triggerBtn = document.querySelector("#trigger");
  const actionBtn = document.querySelector("#action");

  triggerBtn.addEventListener("click", () => actionBtn.focus());
</script>
```

## Events

Components may emit custom DOM events. You can listen to these events to perform
actions.

```html preview expanded events
<ds-button id="focus-button">Focus me</ds-button>

<p>Number of times focused: <b id="count">0</b></p>

<script>
  const button = document.querySelector("#focus-button");
  const countDisplay = document.querySelector("#count");
  let count = 0;

  button.addEventListener("focus", () => {
    count++;
    countDisplay.innerText = count;
  });
</script>
```
