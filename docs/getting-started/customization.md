# Customization

#> Web components offer native encapsulation of styles but still provide opportunities for customization when needed.

## Custom Properties

Components may offer a variety of
[CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
(variables) to allow for modifying the appearance of a component. Unlike standard
CSS styles, custom properties can cascade through the shadow DOM.

```html preview expanded custom-properties
<ds-button class="square">Square Button</ds-button>

<style type="text/css">
  .square {
    --border-radius: 0;
  }
</style>
```

## Shadow Parts

Sometimes you may desire a level of control beyond what is possible with custom
properties. In these cases, components may offer shadow parts. These shadow
parts enable the use of the `::part` CSS pseudo selector to apply traditional CSS
properties to designated areas of the shadow DOM.

```html preview expanded parts
<ds-button class="gradient">Gradient Button</ds-button>

<style type="text/css">
  .gradient::part(base) {
    background-image: linear-gradient(43deg, #4158d0 0%, #c850c0 46%, #ffcc70 100%);
    border: 0;
    color: #ffffff;
    text-shadow: 1px 1px 2px #00000060;
    transition: 500ms;
  }

  .gradient::part(base):hover {
    filter: brightness(1.2);
  }
</style>
```
