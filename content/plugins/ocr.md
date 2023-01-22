---
part: Plugins
title: "@nut-tree/plugin-ocr"
description: "Kind: OCR provider"
---

---

## Installation

```shell
npm i @nut-tree/plugin-ocr
```

**Attention:** `@nut-tree/plugin-ocr` is only available to sponsors of nut.js.
In case you want to get access to it, please consult [the sponsoring profile](https://github.com/sponsors/s1hofmann)

---

## Description

`@nut-tree/plugin-ocr` is an OCR plugin for nut.js.
It provides an implementation of the [TextFinderInterface](https://nut-tree.github.io/apidoc/interfaces/provider_text_finder_interface.TextFinderInterface.html) to perform on-screen text search.
Additionally, it provides a plugin that extends the nut.js [Screen](https://nut-tree.github.io/apidoc/classes/screen_class.ScreenClass.html) with the ability to extract text from screen regions.

--- 

## Configuration

`@nut-tree/plugin-ocr` both extends existing nut.js functionality and exports a set of configuration and utility functions.

### configure()
Configure the plugin by providing an `OcrPluginConfiguration`. Calling `configure()` is optional, as the plugin comes with sensible defaults.

```ts
interface OcrPluginConfiguration {
    languageModelType?: LanguageModelType;
    dataPath?: string;
}
```

#### OcrPluginConfiguration.languageModelType

The type of language model to use. Defaults to `LanguageModelType.DEFAULT`.

`@nut-tree/plugin-ocr` uses language models to perform OCR.
There are different language models available which might lead to more accurate or faster results.

In total, there are three different language models available:

- `DEFAULT`: The default language model.
- `BEST`: Better accuracy, but slower.
- `FAST`: Faster, but less accurate.

#### OcrPluginConfiguration.dataPath

The path to store language models. 

You can adjust this path to avoid re-downloading language models.

### preloadLanguages()

`@nut-tree/plugin-ocr` supports multiple languages.

By default, the plugin will check if a required language model is available on every OCR run and download it if necessary.

If you want to avoid delays during execution due to language model downloads, you can preload language models by calling `preloadLanguages()`.

```ts
function preloadLanguages(languages: Language[], languageModels: LanguageModelType[] = [Location]): Promise<void[]> {
    
}
```

- `languages`: An array of languages to preload.
- `languageModels`: An array of language models to preload. Defaults to `[LanguageModelType.DEFAULT]`.

Supported languages are:

```ts
export enum Language {
    Afrikaans,
    Albanian,
    Amharic,
    Arabic,
    Armenian,
    Assamese,
    Azerbaijani,
    AzerbaijaniCyrilic,
    Basque,
    Belarusian,
    Bengali,
    Bosnian,
    Breton,
    Bulgarian,
    Burmese,
    Catalan,
    Cebuano,
    CentralKhmer,
    Cherokee,
    ChineseSimplified,
    ChineseTraditional,
    Corsican,
    Croatian,
    Czech,
    Danish,
    Dutch,
    Dzongkha,
    English,
    EnglishMiddle,
    Esperanto,
    Estonian,
    Faroese,
    Filipino,
    Finnish,
    French,
    FrenchMiddle,
    Galician,
    Georgian,
    GeorgianOld,
    German,
    GermanFraktur,
    GreekAncient,
    GreekModern,
    Gujarati,
    Haitian,
    Hebrew,
    Hindi,
    Hungarian,
    Icelandic,
    Indonesian,
    Inuktitut,
    Irish,
    Italian,
    ItalianOld,
    Japanese,
    Javanese,
    Kannada,
    Kazakh,
    Kirghiz,
    Korean,
    KoreanVertical,
    Kurdish,
    Kurmanji,
    Lao,
    Latin,
    Latvian,
    Lithuanian,
    Luxembourgish,
    Macedonian,
    Malay,
    Malayalam,
    Maltese,
    Maori,
    Marathi,
    Math,
    Mongolian,
    Nepali,
    Norwegian,
    Occitan,
    Oriya,
    Panjabi,
    Persian,
    Polish,
    Portuguese,
    Pushto,
    Quechua,
    Romanian,
    Russian,
    Sanskrit,
    ScottishGaelic,
    Serbian,
    SerbianLatin,
    Sindhi,
    Sinhala,
    Slovak,
    Slovenian,
    Spanish,
    SpanishOld,
    Sundanese,
    Swahili,
    Swedish,
    Syriac,
    Tagalog,
    Tajik,
    Tamil,
    Tatar,
    Telugu,
    Thai,
    Tibetan,
    Tigrinya,
    Tonga,
    Turkish,
    Uighur,
    Ukrainian,
    Urdu,
    Uzbek,
    UzbekCyrilic,
    Vietnamese,
    Welsh,
    WesternFrisian,
    Yiddish,
    Yoruba
}
```
---

## Usage: On-screen text search

Let's dive right into an example:

```ts
import {centerOf, getActiveWindow, mouse, screen, singleWord, straightTo} from "@nut-tree/nut-js";
import {configure, Language, LanguageModelType, preloadLanguages} from "@nut-tree/plugin-ocr";

configure({
    dataPath: "/path/to/store/language/models",
    languageModelType: LanguageModelType.BEST
});

(async () => {
    await preloadLanguages([Language.English, Language.German]);

    screen.config.ocrConfidence = 0.8;
    screen.config.autoHighlight = true;

    const location = await screen.find(singleWord("WebStorm"), {
        providerData: {
            lang: [Language.English, Language.German],
            partialMatch: false,
            caseSensitive: false
        }
    });
    await mouse.move(
        straightTo(
            centerOf(
                location
            )
        )
    );
})();
```

We already talked about `configure()` and `preloadLanguages()` in the [configuration section](#configuration), but there are a few additional things to note here:

- `screen.config.ocrConfidence`: When using both image and text search, you can explicitly set the confidence threshold for text search to use two different confidence thresholds for image and text search.
- `singleWord`: nut.js currently supports two kinds of text search, `singleWord` and `textLine`. `singleWord` will search for a single word, while `textLine` will search for a while line of text.

### Search configuration

`@nut-tree/plugin-ocr` supports a set of configuration options for text search, passed via the `providerData` property of [OptionalSearchParameters](https://nut-tree.github.io/apidoc/classes/optionalsearchparameters_class.OptionalSearchParameters.html) object.

```ts
export interface TextFinderConfig {
    lang?: Language[], // Languages used for OCR, defaults to [Language.English]
    partialMatch?: boolean, // Allow partial matches, defaults to false
    caseSensitive?: boolean, // Case sensitive search, defaults to false
    preprocessConfig?: ImagePreprocessingConfig // Image preprocessing configuration
}
```

---

## Usage: On-screen text extraction

Just as with [Usage: On-screen text search](#usage-on-screen-text-search), we'll start with an example:

```ts
import {getActiveWindow, screen} from "@nut-tree/nut-js";
import {configure, Language, LanguageModelType, preloadLanguages} from "@nut-tree/plugin-ocr";

configure({
    dataPath: "/path/to/store/language/models",
    languageModelType: LanguageModelType.BEST
});

const activeWindowRegion = async () => {
    const activeWindow = await getActiveWindow();
    return activeWindow.region;
}

(async () => {
    await preloadLanguages([Language.English, Language.German]);
    const text = await screen.read({searchRegion: activeWindowRegion(), split: TextSplit.LINE});
})();
```

`screen.read` uses the same configuration and preload mechanisms as `screen.find`.

Additionally, `screen.read` supports a set of configuration options for text extraction, passed via `ReadTextConfig`:

```ts
export interface ReadTextConfig {
    searchRegion?: Region | Promise<Region>, // The region to extract text from. Defaults to the entire screen
    languages?: Language[], // An array of languages to use for OCR. Defaults to `Language.English`
    split?: TextSplit, // How to split the extracted text. Defaults to `TextSplit.NONE`
    preprocessConfig?: ImagePreprocessingConfig // Image preprocessing configuration
}
```

### TextSplit

`TextSplit` is an enum that defines how the extracted text should be split:

```ts
enum TextSplit {
    SYMBOL,
    WORD,
    LINE,
    PARAGRAPH,
    BLOCK,
    NONE
}
```

This allows to configure the level of detail for text extraction.
`TextSplit.SYMBOL` will split the result at single character level, `TextSplit.WORD` on word level and so on.

The default value is `TextSplit.NONE`, which will return the extracted text as a single string (similar to `TextSplit.BLOCK` in most cases).

Depending on the configured text split, the result of `screen.read` is one of the following types:

```ts
interface SymbolOCRResult {
    text: string,
    confidence: number,
    isSuperscript: boolean,
    isSubscript: boolean,
    isDropcap: boolean
}

interface WordOCRResult {
    text: string,
    confidence: number,
    isNumeric: boolean,
    isInDictionary: boolean,
    textDirection: result.textDirection,
    symbols: SymbolOCRResult[],
    font: FontInfo,
}

interface FontInfo {
    isBold: boolean;
    isItalic: boolean;
    isUnderlined: boolean;
    isMonospace: boolean;
    isSerif: boolean;
    isSmallcaps: boolean;
    fontSize: number;
    fontId: number;
}

interface LineOCRResult {
    text: string,
    confidence: number,
    words: WordOCRResult[],
}

interface ParagraphOCRResult {
    text: string,
    confidence: number,
    isLeftToRight: boolean,
    lines: LineOCRResult[],
}

interface BlockOCRResult {
    text: string,
    confidence: number,
    blockType: TextBlockType,
    paragraphs: ParagraphOCRResult[],
}

enum TextBlockType {
    UNKNOWN,         // Type is not yet known. Keep as the first element.
    FLOWING_TEXT,    // Text that lives inside a column.
    HEADING_TEXT,    // Text that spans more than one column.
    PULLOUT_TEXT,    // Text that is in a cross-column pull-out region.
    EQUATION,        // Partition belonging to an equation region.
    INLINE_EQUATION, // Partition has inline equation.
    TABLE,           // Partition belonging to a table region.
    VERTICAL_TEXT,   // Text-line runs vertically.
    CAPTION_TEXT,    // Text that belongs to an image.
    FLOWING_IMAGE,   // Image that lives inside a column.
    HEADING_IMAGE,   // Image that spans more than one column.
    PULLOUT_IMAGE,   // Image that is in a cross-column pull-out region.
    HORZ_LINE,       // Horizontal Line.
    VERT_LINE,       // Vertical Line.
    NOISE,           // Lies outside of any column.
    COUNT
}
```