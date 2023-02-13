---
part: Plugins
title: "@nut-tree/bolt"
description: "Kind: Low-level provider"
---

---

## Installation

```shell
npm i @nut-tree/bolt
```

**Attention:** `@nut-tree/bolt` is only available to sponsors of nut.js.
In case you want to get access to it, please consult [the sponsoring profile](https://github.com/sponsors/s1hofmann)

---

## Description

`@nut-tree/bolt` is an alternative low-level provider for nut.js.
It can replace the default `@nut-tree/nut-js` low-level provider, `@nut-tree/libnut`, and comes with additional features.

The most significant features at the time of writing are:

- Unicode support for keyboard input
- An implementation of the [WindowFinderInterface](https://nut-tree.github.io/apidoc/interfaces/provider_window_finder_interface.WindowFinderInterface.html) to find windows by title

--- 

## Usage

`@nut-tree/bolt` exports a set of functions for fine-grained control over each low-level provider.

- `useBoltKeyboard()`: Replaces the default keyboard provider with `@nut-tree/bolt`'s keyboard implementation
- `useBoltMouse()`: Replaces the default mouse provider with `@nut-tree/bolt`'s mouse implementation
- `useBoltScreen()`: Replaces the default screen provider with `@nut-tree/bolt`'s screen implementation
- `useBoltWindows()`: Replaces the default window provider with `@nut-tree/bolt`'s window implementation
- `useBoltWindowFinder()`: Registers the `@nut-tree/bolt` window finder implementation

```js
const { screen, imageResource } = require("@nut-tree/nut-js");
const { useBoltKeyboard } = require("@nut-tree/bolt");

useBoltKeyboard(); // From this point on all keyboard interactions will be handled by @nut-tree/bolt

(async () => {
  const img = await screen.findAll(imageResource("..."));
})();
```

In case you want to use all available `@nut-tree/bolt` providers, you can use the `useBolt()` function:

```js
const { screen, imageResource } = require("@nut-tree/nut-js");
const { useBolt } = require("@nut-tree/bolt");

useBolt(); // Now we have all @nut-tree/bolt providers set up, including the window finder

(async () => {
    const wnd = await screen.find(windowWithTitle(/some.*regex/));
})();
```
