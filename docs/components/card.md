# Card

#> Cards can be used to group related subjects in a container.

```html preview expanded
<ds-card>
  <div slot="header">My Card</div>
  Card content goes here.
</ds-card>
```

## Examples

### Without Header

The `header` slot can be omitted, if desired.

```html preview
<ds-card> An even simpler card without a header. </ds-card>
```

### Border Radius

Use the `--border-radius` CSS property to modify the card's border radius.

```html preview
<ds-card style="--border-radius: 20px;">
  <div slot="header">My Card</div>
  Card content goes here.
</ds-card>
```

## API Documentation

[component-metadata]
