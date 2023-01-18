---
part: Plugins
title: "@nut-tree/template-matcher"
description: "Kind: ImageFinder provider"
---

--- 

## Installation

```shell
npm i @nut-tree/template-matcher
```

**Attention:** `@nut-tree/template-matcher` only supports node up to v16 and Electron up to v13.

In case you want to use image search in later versions of node/Electron, please consult [the sponsoring profile](https://github.com/sponsors/s1hofmann) for access to `@nut-tree/nl-matcher`.

--- 

## Usage

Simply require / import the package to wire up the provider:

```js
const { screen, imageResource } = require("@nut-tree/nut-js");
require("@nut-tree/template-matcher");

(async () => {
  const img = await screen.find(imageResource("..."));
})();
```

---

## Configuration

`@nut-tree/template-matcher` takes an optional configuration object passed to it via [MatchRequest#providerData](https://nut-tree.github.io/apidoc/classes/match_request_class.MatchRequest.html#providerData) property.

```ts
export interface TemplateMatcherProviderData {
    searchMultipleScales: boolean; // default: true
}
```

```js
const {screen, imageResource} = require("@nut-tree/nut-js");
require("@nut-tree/template-matcher");

(async () => {
    const img = await screen.findAll(imageResource("..."), {
        providerData: {
            searchMultipleScales: false
        }
    });
})();
```
