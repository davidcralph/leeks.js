/**
 * @module leeks.js
 * @copyright David Ralph 2019-2026
 * @license MIT
 */

import { hasColoursSupported } from './utils/hasColoursSupported.ts';
import Colours from './data/Colours.ts';
import Styles from './data/Styles.ts';
import Keywords from './data/Keywords.ts';
import ShortCodes from './data/ShortCodes.ts';

export type StyleFn = (t: string) => string;
export type RGB = readonly [number, number, number];
export type ColourName = keyof typeof Colours;
export type StyleName = keyof typeof Styles;
export type KeywordName = keyof typeof Keywords;

let colorsEnabled = hasColoursSupported();

/**
 * Close codes for styles. Styles that only turn something off (e.g. `nounderline`) have no close code.
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_(Select_Graphic_Rendition)_parameters
 */
const styleCloses: Partial<Record<StyleName, number>> = {
  reset: 0,
  bold: 22,
  dim: 22,
  italic: 23,
  underline: 24,
  overline: 55,
  blink: 25,
  inverse: 27,
  strikethrough: 29,
  hidden: 28
};

/**
 * Wrap text in an SGR open code and its matching close code. Any matching close code already inside
 * the text (from nested calls) re-opens the outer style afterwards, so nesting works as expected.
 */
function wrap(open: string | number, close: number | undefined, t: string): string {
  const text = String(t); // `String()` so tagged template calls (an array) don't break
  if (!colorsEnabled) {
    return text;
  }

  const o = `\x1b[${open}m`;
  if (close === undefined) {
    return o + text;
  }

  const c = `\x1b[${close}m`;
  return o + text.replaceAll(c, c + o) + c;
}

function hexToRgb(hex: string): RGB {
  let h = hex.replace('#', '');
  if (h.length === 3) {
    h = [...h].map(ch => ch + ch).join('');
  }

  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Change the colour of the given text (List: https://docs.davidcralph.co.uk/#/leeks) */
const colours = {} as Record<ColourName, StyleFn>;
for (const c of Object.keys(Colours) as ColourName[]) {
  colours[c] = t => wrap(Colours[c], c.startsWith('bg') ? 49 : 39, t);
}

/** Change the style of the given text (List: https://docs.davidcralph.co.uk/#/leeks) */
const styles = {} as Record<StyleName, StyleFn>;
for (const s of Object.keys(Styles) as StyleName[]) {
  styles[s] = t => wrap(Styles[s], styleCloses[s], t);
}

/** Change the colour of the given text using CSS keywords (List: https://docs.davidcralph.co.uk/#/leeks) */
const keywords = {} as Record<KeywordName, StyleFn>;
/** Change the background colour of the given text using CSS keywords (List: https://docs.davidcralph.co.uk/#/leeks) */
const bgKeywords = {} as Record<KeywordName, StyleFn>;
for (const k of Object.keys(Keywords) as KeywordName[]) {
  keywords[k] = t => rgb(Keywords[k], t);
  bgKeywords[k] = t => rgbBg(Keywords[k], t);
}

/**
 * Change the colour of the given text using 8-bit colours
 * @param i The 8-bit colour to use (0-255)
 * @param t The text to show with the 8-bit colour
 */
export function eightBit(i: number, t: string): string {
  return wrap(`38;5;${i}`, 39, t);
}

/**
 * Change the background colour of the given text using 8-bit colours
 * @param i The 8-bit colour to use (0-255)
 * @param t The text to show with the 8-bit colour
 */
export function eightBitBg(i: number, t: string): string {
  return wrap(`48;5;${i}`, 49, t);
}

/**
 * Change the colour of the given text using RGB
 * @param rgb An array of the RGB to use
 * @param t The text to show with the RGB colour
 */
export function rgb([r, g, b]: RGB, t: string): string {
  return wrap(`38;2;${r};${g};${b}`, 39, t);
}

/**
 * Change the background colour of the given text using RGB
 * @param rgb An array of the RGB to use
 * @param t The text to show with the RGB colour
 */
export function rgbBg([r, g, b]: RGB, t: string): string {
  return wrap(`48;2;${r};${g};${b}`, 49, t);
}

/**
 * Change the colour of the given text using hexadecimals
 * @param hex The hex to use, e.g. `#7289da` or `#fff`
 * @param t The text to show with the hexadecimal colour
 */
export function hex(hex: string, t: string): string {
  return rgb(hexToRgb(hex), t);
}

/**
 * Change the background colour of the given text using hexadecimals
 * @param hex The hex to use, e.g. `#7289da` or `#fff`
 * @param t The text to show with the hexadecimal colour
 */
export function hexBg(hex: string, t: string): string {
  return rgbBg(hexToRgb(hex), t);
}

const shortColours: Record<string, ColourName> = ShortCodes.colours;
const shortStyles: Record<string, StyleName> = ShortCodes.styles;

/**
 * Add colours and styles to a string using short codes
 * @param t The text to format
 */
export function short(t: string): string {
  const sgr = (code: string | number) => colorsEnabled ? `\x1b[${code}m` : '';

  return t
    .replace(/&!?[0-9a-f]/gi, code => sgr(Colours[shortColours[code.toLowerCase()]!]))
    .replace(/&[i-pr]/gi, code => sgr(Styles[shortStyles[code.toLowerCase()]!]))
    .replace(/&!?#([0-9a-f]{6}|[0-9a-f]{3})/gi, (match, code: string) => {
      const [r, g, b] = hexToRgb(code);
      return sgr(`${match.includes('!') ? '48' : '38'};2;${r};${g};${b}`);
    }) + sgr(0);
}

/**
 * Set an alias
 * @param name The name of the alias
 * @param type Either "colours", "colors" or "styles"
 * @param value The colour/style you want to use, e.g leeks.colours.green
 */
export function alias(name: string, type: 'colours' | 'colors' | 'styles', value: StyleFn): void {
  switch (type) {
    case 'colors':
    case 'colours':
      (colours as Record<string, StyleFn>)[name] = value;
      break;
    case 'styles':
      (styles as Record<string, StyleFn>)[name] = value;
      break;
    default:
      throw new Error('Must be "colours", "colors" or "styles"');
  }
}

/** Enable colour support for leeks.js */
export function enableColours(): void {
  colorsEnabled = true;
}

/** Disable colour support for leeks.js */
export function disableColours(): void {
  colorsEnabled = false;
}

export {
  colours as colors,
  colorsEnabled as supportsColor,
  colorsEnabled as supportsColour,
  enableColours as enableColors,
  disableColours as disableColors,
  colours,
  keywords,
  bgKeywords,
  styles
};

/** Default export, so `import leeks from 'leeks.js'` keeps working */
export default {
  colours,
  colors: colours,
  styles,
  keywords,
  bgKeywords,
  eightBit,
  eightBitBg,
  rgb,
  rgbBg,
  hex,
  hexBg,
  short,
  alias,
  enableColours,
  enableColors: enableColours,
  disableColours,
  disableColors: disableColours,
  get supportsColor() {
    return colorsEnabled;
  },
  get supportsColour() {
    return colorsEnabled;
  }
};
