---
part: Plugins
title: "@nut-tree/nl-matcher"
description: "Kind: ImageFinder provider"
---

---

## Installation

```shell
npm i @nut-tree/nl-matcher
```

**Attention:** `@nut-tree/nl-matcher` is only available to sponsors of nut.js.
In case you want to get access to it, please consult [the sponsoring profile](https://github.com/sponsors/s1hofmann)

---

## Description

**N**ext **L**evel module for image search.

Comes with additional features compared to `@nut-tree/template-matcher`:

- It is future-proof and supports a wide range of current and future node and/or Electron versions
- It works on Apple Silicon chips
- Supports `screen.findAll(...)` to detect multiple instances of an image on screen
- Supports alpha-channel masking of irrelevant parts of an image
- Is faster compared to `@nut-tree/template-matcher`

```bash
hyperfine --warmup 3 'node template-matcher.js' 'node nl-matcher.js' --show-output
Benchmark 1: node template-matcher.js
  Time (mean ± σ):      1.575 s ±  0.016 s    [User: 1.469 s, System: 0.225 s]
  Range (min … max):    1.545 s …  1.590 s    10 runs

Benchmark 2: node nl-matcher.js
  Time (mean ± σ):     917.3 ms ±  11.1 ms    [User: 1616.6 ms, System: 388.0 ms]
  Range (min … max):   899.7 ms … 930.7 ms    10 runs

Summary
  'node nl-matcher.js' ran
    1.72 ± 0.03 times faster than 'node template-matcher.js'
```

---

## Usage

Simply require / import the package to wire up the provider:

```js
const { screen, imageResource } = require("@nut-tree/nut-js");
require("@nut-tree/nl-matcher");

(async () => {
  const img = await screen.findAll(imageResource("..."));
})();
```

---

## Configuration

`@nut-tree/nl-matcher` takes an optional configuration object passed to it via [MatchRequest#providerData](https://nut-tree.github.io/apidoc/classes/match_request_class.MatchRequest.html#providerData) property.

```ts
export interface NlMatcherProviderData {
    searchMultipleScales: boolean; // default: true
}
```

```js
const {screen, imageResource} = require("@nut-tree/nut-js");
require("@nut-tree/nl-matcher");

(async () => {
    const img = await screen.findAll(imageResource("..."), {
        providerData: {
            searchMultipleScales: false
        }
    });
})();
```