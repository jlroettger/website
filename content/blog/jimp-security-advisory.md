---
part: Blog
title: jimp security advisory
description: "Mitigating current security vulnerabilities in jimp"
tags: [security, advisory]
updated: '2022-08-27'
---

## Description

A user recently opened an [issue](https://github.com/nut-tree/nut.js/issues/422) regarding open [security vulnerabilities through `jimp`](https://github.com/advisories/GHSA-xvf7-4v9q-58w6).

The vulnerable package in question is [jpeg-js](https://www.npmjs.com/package/jpeg-js), a dependency of [@jimp/jpeg](https://www.npmjs.com/package/@jimp/jpeg).

The good news is that the vulnerable package itself has been patched in version `0.4.4`.

Unfortunately, [@jimp/jpeg](https://www.npmjs.com/package/@jimp/jpeg) has not yet been updated, which leads to the following two problems:

The latest version of [@jimp/jpeg](https://www.npmjs.com/package/@jimp/jpeg) has pinned [jpeg-js](https://www.npmjs.com/package/jpeg-js) to version `0.4.2`, which is vulnerable.
Previous versions are specifying a too wide version range (`^0.4.0`), which would also allow vulnerable versions of [jpeg-js](https://www.npmjs.com/package/jpeg-js).

## Advisory

While we are waiting for a new upstream release of [@jimp/jpeg](https://www.npmjs.com/package/@jimp/jpeg) (there's already an [open PR](https://github.com/oliver-moran/jimp/pull/1090)) to do a patch release of nut.js, users can mitigate this issue by configuring an [override](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#overrides) for `jpeg-js` to force usage of the fixed version.

```json numbered marked=12,13,14,15,16
{
  "name": "override-jpeg-js",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "overrides": {
    "@nut-tree/nut-js": {
      "jpeg-js": "0.4.4"
    }
  },
  "dependencies": {
    "@nut-tree/nut-js": "^2.2.0"
  }
}
```

All the best and sorry for the inconveniences

Simon
