---
part: Blog
title: Release v3.0.0
description: "@nut-tree/nut-js@3.0.0 has been released!"
tags: [release]
updated: '2023-01-18'
---

It's live! `@nut-tree/nut-js@3.0.0`! 🚀 

A little over a year after the last major release I'm happy to announce the release of **nut.js v3.0.0** 🎉

## What's new?

Release v3.0.0 brings a lot of new features and improvements to nut.js, but here are two things I want to highlight:

### Logging Providers

Often times nut.js is incorporated in an existing application and naturally, one would love to know what's going on under the hood.
Logging is a diverse topic and there are multitudes of different logging frameworks out there.

Frameworks that ship their own logging which is fully decoupled from your application's logging strategy are a bit cumbersome, so nut.js chose a different approach.
Instead of shipping a logging framework, nut.js now ships with a logging provider interface, which allows you to plug in your own logging framework of choice.

By default, nut.js ships a `ConsoleLogger`, but by implementing the `LogProviderInterface` you can register your own provider that wraps your already in place logging framework to include nut.js log output in your existing logging strategy.

Here's an example of how to use the `ConsoleLogger`:

```js
const {
    useConsoleLogger,
    ConsoleLogLevel,
} = require("@nut-tree/nut-js");

useConsoleLogger({ logLevel: ConsoleLogLevel.DEBUG });

(async () => {
    // ...
})();
```

and what the log output looks like:

```
2023-01-17T00:47:21.748Z - DEBUG - [nut.js] - Search region is valid
2023-01-17T00:47:23.652Z - DEBUG - [nut.js] - Language data for eng already exists in data path /private/tmp/d/node_modules/@nut-tree/ocr/language_data/tessdata, skipping
2023-01-17T00:47:26.305Z - INFO - [nut.js] - Using ocrConfidence override: 0.8
2023-01-17T00:47:26.306Z - DEBUG - [nut.js] - Found match! {
  location: Region { left: 328, top: 500, width: 141.5, height: 18 },
  confidence: 90.44261169433594
}
2023-01-17T00:47:26.306Z - DEBUG - [nut.js] - 0 hooks triggered for match
2023-01-17T00:47:26.306Z - INFO - [nut.js] - Match is located at (328, 500, 141.5, 18)
2023-01-17T00:47:26.306Z - DEBUG - [nut.js] - Autohighlight is enabled
2023-01-17T00:47:26.307Z - INFO - [nut.js] - Highlighting (328, 500, 141.5, 18) for 0.5 with 25% opacity
2023-01-17T00:47:26.958Z - INFO - [nut.js] - Moving mouse to target point (398, 509)
```

The approach of connecting your own log provider is similar:

```ts
import { useLogger, LogLevel, LogProviderInterface } from "@nut-tree/nut-js";

class Logger implements LogProviderInterface {
    debug(message: string, data: {} | undefined): void {
        // ...
    }

    error(error: Error, data: {} | undefined): void {
        // ...
    }

    info(message: string, data: {} | undefined): void {
        // ...
    }

    trace(message: string, data: {} | undefined): void {
        // ...
    }

    warn(message: string, data: {} | undefined): void {
        // ...
    }
}

useLogger(new Logger());
```

### `screen.find`

`screen.find` got a lot of love in this release.
It now supports additional types of `Finders`, so now you can not just find images on screen, but also text and/or windows.

These new types of `Finders` seamlessly integrate into the existing `screen.find` API, so you can use them in the same way as you would use the `ImageFinder`:

```js
const {
  mouse,
  screen,
  singleWord,
  sleep,
  useConsoleLogger,
  ConsoleLogLevel,
  straightTo,
  centerOf,
  Button,
  getActiveWindow,
} = require("@nut-tree/nut-js");
const {
  preloadLanguages,
  Language,
  LanguageModelType,
  configure,
} = require("@nut-tree/plugin-ocr");

configure({ languageModelType: LanguageModelType.BEST });

useConsoleLogger({ logLevel: ConsoleLogLevel.DEBUG });

screen.config.autoHighlight = true;
screen.config.ocrConfidence = 0.8;

function activeWindowRegion() {
  return getActiveWindow().then((activeWindow) => activeWindow.region);
}

(async () => {
  await preloadLanguages([Language.English], [LanguageModelType.BEST]);
  await sleep(5000);
  const result = await screen.find(singleWord("nut-tree"));
  await mouse.move(straightTo(centerOf(result)));
  await mouse.click(Button.LEFT);
  await screen.waitFor(singleWord("Native"), 15000, 1000, {
    providerData: { partialMatch: true },
  });
  const content = await screen.read({ searchRegion: activeWindowRegion() });
  console.log(content);
})();
```

This way it's now possible to `waitFor` a window to appear, `findAll` occurrences of text on screen, or, just like it was already possible, `find` an image.

## What else?

But wait, there's even more! 🤯

Not only did I release nut.js v3.0.0, but I also updated/build plugins!

- I updated the available `ImageFinder` plugins to comply with the new `OptionalSearchParameters` interface.
- I built a completely **NEW** plugin that gives you the ability to **read text** from screen! 👓
- In addition to the above, I built a completely **NEW** plugin that gives you the ability to **search text** on screen! 🔎
- I also built a new low-level provider plugin that comes with new features like unicode support for keyboard input and a provider to search for windows on screen. ⌨️

All of these packages are only available to sponsors of nut.js, so if you want to get your hands on them, you can do so by becoming a sponsor.

See the [FAQ](https://nutjs.dev/#faq-sponsor-benefits) for additional information.

## What's next?

Get it on [npm](https://www.npmjs.com/package/@nut-tree/nut-js)

[Check out the changelog](https://github.com/nut-tree/nut.js/releases/tag/v2.3.0)

Please share your feedback on Twitter/GitHub/Discord!

All the best

Simon
