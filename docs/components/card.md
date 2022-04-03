# Card

```html preview expanded default
<ds-card>
  <div slot="header">My Card</div>
  Card content goes here.
</ds-card>
```

## Examples

### Without Header

The `header` slot can be omitted, if desired.

```html preview without-header
<ds-card> An even simpler card without a header. </ds-card>
```

### Border Radius

Use the `--border-radius` CSS property to modify the card's border radius.

```html preview border-radius
<ds-card style="--border-radius: 20px;">
  <div slot="header">My Card</div>
  Card content goes here.
</ds-card>
```

## API Documentation

[component-metadata]
