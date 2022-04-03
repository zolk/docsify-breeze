# Button

```html preview expanded default
<ds-button>Button</ds-button>
```

## Examples

### Variant

Use the `variant` prop to change the visual style of the button.

```html preview variants
<ds-button variant="default">Default</ds-button>
<ds-button variant="primary">Primary</ds-button>
<ds-button variant="success">Success</ds-button>
<ds-button variant="info">Info</ds-button>
<ds-button variant="warning">Warning</ds-button>
<ds-button variant="danger">Danger</ds-button>
```

### Sizes

Use the `size` prop to change a button's size.

```html preview sizes
<ds-button size="small">Small</ds-button>
<ds-button size="medium">Medium</ds-button>
<ds-button size="large">Large</ds-button>
```

### Border Radius

Use the `--border-radius` CSS property to modify the button's border radius.

```html preview border-radius
<ds-button style="--border-radius: 240px">Pill Button</ds-button>
```

### Disabled

Use the `disabled` attribute to disable the button and suppress all click events.

```html preview disabled
<ds-button disabled>Disabled Button</ds-button>
```

### Link Buttons

Setting the `href` attribute will render the underlying element as an `a` rather
than a `button`. This will also enable use of the `download` and `target` properties.

```html preview link
<ds-button href="http://8thlight.com" target="_blank">Link Button</ds-button>
```

## API Documentation

[component-metadata]
