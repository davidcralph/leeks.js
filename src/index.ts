/**
 * @module leeks.js
 * @copyright David Ralph 2019-2021
 * @license MIT
 */

import * as detect from './utils/hasColoursSupported';
import Colours from './data/Colours';
import Styles from './data/Styles';
import Keywords from './data/Keywords';
import ShortCodes from './data/ShortCodes';

let colorsEnabled = detect.hasColoursSupported();

/** 
 * Change the colour of the given text (List: https://docs.davidcralph.co.uk/#/leeks) 
 * @param {string} t The text to change the colour of
 */
const colours = [];
for (const c in Colours) {
  colours[c] = (t: string) => colorsEnabled ? `\x1b[${Colours[c]}m${t}\x1b[0m` : t;
}

/** 
 * Change the style of the given text (List: https://docs.davidcralph.co.uk/#/leeks) 
 * @param {string} t The text to change the colour of
 */
const styles = [];
for (const s in Styles) {
  styles[s] = (t: string) => colorsEnabled ? `\x1b[${Styles[s]}m${t}\x1b[0m` : t;
}

/** 
 * Change the colour of the given text using CSS keywords (List: https://docs.davidcralph.co.uk/#/leeks) 
 * @param {string} t The text to change the colour of
 */
const keywords = [];
for (const k in Keywords) {
  keywords[k] = (t: string) => colorsEnabled ? rgb(Keywords[k], t) : t;
}

/** 
 * Change the background colour of the given text using CSS keywords (List: https://docs.davidcralph.co.uk/#/leeks) 
 * @param {string} t The text to change the colour of
 */
const bgKeywords = [];
for (const k in Keywords) {
  bgKeywords[k] = (t: string) => colorsEnabled ? rgbBg(Keywords[k], t) : t;
}

/**
 * Change the colour of the given text using 8-bit colours
 * @param {string} i The 8-bit colour to use
 * @param {string} t The text to show with the 8-bit colour
 */
export function eightBit(i: string, t: string) {
  if (!colorsEnabled) {
    return t;
  }

  return '\033' + `[38;5;${i}m${t}\x1b[0m`;
};

/**
 * Change the background colour of the given text using 8-bit colours
 * @param {string} i The 8-bit colour to use
 * @param {string} t The text to show with the 8-bit colour
 */
export function eightBitBg(i: string, t: string) {
  if (!colorsEnabled) {
    return t;
  }

  return '\033' + `[48;5;${i}m${t}\x1b[0m`;
};

/**
 * Change the colour of the given text using RGB
 * @param {[number, number, number]} rgb An array of the RGB to use
 * @param {string} t The text to show with the RGB colour
 */
export function rgb(rgb: [number, number, number], t: string) {
  if (!colorsEnabled) {
    return t;
  }

  const [r, g, b] = rgb;
  return '\033' + `[38;2;${r};${g};${b}m${t}\x1b[0m`;
};

/**
 * Change the background colour of the given text using RGB
 * @param {[number, number, number]} rgb An array of the RGB to use
 * @param {string} t The text to show with the RGB colour
 */
export function rgbBg(rgb: [number, number, number], t: string) {
  if (!colorsEnabled) {
    return t;
  }

  const [r, g, b] = rgb;
  return '\033' + `[48;2;${r};${g};${b}m${t}\x1b[0m`;
};

/**
 * Change the colour of the given text using hexadecimals
 * @param {string} hex The hex to use
 * @param {string} t The text to show with the hexadecimal colour
 * @credit [Stack Overflow](https://stackoverflow.com/q/5623838)
 */
export function hex(hex: string, t: string) {
  const bigint = parseInt(hex.replace('#', ''), 16);
  return rgb([(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255], t);
};

/**
 * Change the background colour of the given text using hexadecimals
 * @param {string} hex The hex to use
 * @param {string} t The text to show with the hexadecimal colour
 * @credit [Stack Overflow](https://stackoverflow.com/q/5623838)
 */
export function hexBg(hex: string, t: string) {
  const bigint = parseInt(hex.replace('#', ''), 16);
  return rgbBg([(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255], t);
};

/**
 * Add colours and styles to a string using short codes
 * @param {string} t The text to format
 */
export function short(t: string) {
  return colorsEnabled
    ? t
      .replace(/&!?[0-9a-f]/gi, code => `\x1b[${Colours[ShortCodes.colours[code]]}m`)
      .replace(/&[i-pr]/gi, code => `\x1b[${Styles[ShortCodes.styles[code]]}m`)
      .replace(/&!?#([0-9A-Fa-f]{3,6})/gi, (match, code) => {
        const bigint = parseInt(code, 16);
        const [r, g, b] = [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
        return `\x1b[${match.includes('!') ? '48' : '38'};2;${r};${g};${b}m`;
      }) + '\x1b[0m'
    : t;
}

/**
 * Set an alias
 * @param {string} name The name of the alias 
 * @param {string} type Either "colours", "colors" or "styles"
 * @param {string} value The colour/style you want to use, e.g leeks.colours.green
 */
export function alias(name: string, type: string, value: string) {
  switch (type) {
    case 'colors':
    case 'colours': 
      colours[name] = value; 
      break;
    case 'styles': 
      styles[name] = value; 
      break;
    default: 
      throw new Error('Must be "colours", "colors" or "styles"');
    }
};

/**
 * Enable colour support for leeks.js
 */
export function enableColours() {
  colorsEnabled = true;
}

/**
 * Disable colour support for leeks.js
 */
export function disableColours() {
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
