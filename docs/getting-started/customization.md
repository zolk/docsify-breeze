# Customization

While components offer various styling customization options via properties,
there may be times when you need more advanced styling control.

## Shadow DOM Limitations

All components make use of the
[Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM).
The Shadow DOM provides critical encapsulation that ensures that our components
always render and perform as expected regardless of their surrounding
environment.

Both a benefit and limitation of Shadow DOM are that external styles in
downstream applications will not affect web components:

```css
/* This won't work! */
ds-button div.button__label {
  color: red;
}
```

While this behavior is generally desirable to avoid unintentional style
conflicts, it can limit making more advanced customizations to a component.
However, CSS provides us two options — custom properties and shadow parts — that
allow us to reach inside the shadow DOM while preserving its encapsulation
benefits.

## Custom Properties

[CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
(aka variables) allow us to control aspects of a component's appearance. Some
(but not all) components expose custom properties that you can override in a
downstream application. These custom properties are not considered design tokens
as they are scoped to individual components and thus do not include the `--ds`
prefix used by our global design tokens.

For example, `ds-button` offers a `--border-radius` property that you might use
to modify the shape of a button. You can set this property either via a
stylesheet or using inline styles:

```css
/* Setting a property in a stylesheet */
ds-button {
  --border-radius: 240px;
}
```

```html
// Setting a property inline <ds-button style="--border-radius: 240px;">Pill Button</ds-button>
```

Either of these methods will result in a pill-shaped button.

Refer to each component's documentation for a complete list of available custom
properties.

## Shadow Parts

Many components offer CSS shadow parts that work with the
[`::part()`](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) selector
for more advanced customization. Shadow parts allow you to target the internals
of a component and apply any arbitrary CSS properties.

The following example uses shadow parts available as part of `ep-button` to
increase the icon size and modify the label to use lowercase text.

```html
<ds-button icon="search-line" class="search-button">Search</ds-button>

<style>
  .search-button::part(icon) {
    transform: scale(1.5);
  }

  .search-button::part(label) {
    text-transform: lowercase;
  }
</style>
```

Refer to each component's documentation for a complete list of available shadow
parts.
