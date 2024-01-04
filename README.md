# `@4rk/vue-roving-tabindex`

Add a roving tabindex to a Vue component. This is useful to implement keyboard navigation inside components according to [WAI-ARIA](https://www.w3.org/TR/wai-aria-practices/#kbd_general_within).

## Installation

```javascript
import VueRovingTabindex from "@4rk/vue-roving-tabindex";

app.use(VueRovingTabindex);
```

## Usage

```vue
<template>
  <ul v-roving-tabindex-container>
    <li><button type="button" v-roving-tabindex>foo</button></li>
    <li><button type="button" v-roving-tabindex>bar</button></li>
    <li><button type="button" v-roving-tabindex>baz</button></li>
  </ul>
</template>
```

## Directive API

The package provides two Vue directives:

### v-roving-tabindex-container

This directive denotes the boundary of a roving tabindex sequence. Add it to a parent element of the `v-roving-tabindex` elements.

It has a single boolean modifier to change the direction from vertical to horizontal:

```vue
<div v-roving-tabindex-container.horizontal />
```

### v-roving-tabindex

This directive should be used on every focussable element inside a `v-roving-tabindex-container` that is part of the roving tabindex.

Its value can be set to `false` to remove the element from the roving tabindex:

```vue
<button type="button" v-roving-tabindex="false />
```

## Related work

- [react-roving-tabindex](https://github.com/stevejay/react-roving-tabindex)
- [roving-tabindex-element-list](https://github.com/tajakobsen/roving-tabindex-element-list)
- [vue-mixin-roving-tabindex](https://github.com/tajakobsen/vue-mixin-roving-tabindex)
