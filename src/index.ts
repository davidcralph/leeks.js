/**
 * @module leeks.js
 * @copyright David Ralph (ohlookitsderpy) 2019-2021
 * @license MIT
 */
import Colours from './data/Colours';
import Styles from './data/Styles';
import Keywords from './data/Keywords';

const isNode = typeof process !== 'undefined';

/**
 * Check if colours are supported (returns false on browser)
 * @credit [Colorette](https://github.com/jorgebucaran/colorette)
 */
const supports = isNode ? !('NO_COLOR' in process.env) && process.env.FORCE_COLOR !== '0' && (process.env.FORCE_COLOR !== undefined || process.platform === 'win32' || (process.stdout.isTTY && process.env.TERM && process.env.TERM !== 'dumb')) : false;

// Enable/disable support for colours, by default checks for support using the function
let enabled = supports ? true : false;

/** 
 * Change the colour of the given text (List: https://docs.davidjcralph.co.uk/#/leeks) 
 * @param {string} t The text to change the colour of
 */
let colours = [];
for (const c in Colours) {
	colours[c] = (t: string) => enabled ? `\x1b[${Colours[c]}m${t}\x1b[0m` : t;
}

/** 
 * Change the style of the given text (List: https://docs.davidjcralph.co.uk/#/leeks) 
 * @param {string} t The text to change the colour of
 */
let styles = [];
for (const s in Styles) {
	styles[s] = (t: string) => `\x1b[${Styles[s]}m${t}\x1b[0m`;
}

/** 
 * Change the colour of the given text using CSS keywords (List: https://docs.davidjcralph.co.uk/#/leeks) 
 * @param {string} t The text to change the colour of
 */
let keywords = [];
for (const k in Keywords) {
	keywords[k] = (t: string) => enabled ? rgb(Keywords[k], t) : t;
}

/** 
 * Change the background colour of the given text using CSS keywords (List: https://docs.davidjcralph.co.uk/#/leeks) 
 * @param {string} t The text to change the colour of
 */
let bgKeywords = [];
for (const k in Keywords) {
	bgKeywords[k] = (t: string) => enabled ? rgbBg(Keywords[k], t) : t;
}

/**
 * Change the colour of the given text using 8-bit colours
 * @param {string} i The 8-bit colour to use
 * @param {string} t The text to show with the 8-bit colour
 */
export function eightBit(i: string, t: string) {
	if (!enabled) return t;
	return '\033' + `[38;5;${i}m${t}\x1b[0m`;
};

/**
 * Change the background colour of the given text using 8-bit colours
 * @param {string} i The 8-bit colour to use
 * @param {string} t The text to show with the 8-bit colour
 */
export function eightBitBg(i: string, t: string) {
	if (!enabled) return t;
	return '\033' + `[48;5;${i}m${t}\x1b[0m`;
};

/**
 * Change the colour of the given text using RGB
 * @param {[number, number, number]} rgb An array of the RGB to use
 * @param {string} t The text to show with the RGB colour
 */
export function rgb(rgb: [number, number, number], t: string) {
	if (!enabled) return t;

	const [r, g, b] = rgb;
	return '\033' + `[38;2;${r};${g};${b}m${t}\x1b[0m`;
};

/**
 * Change the background colour of the given text using RGB
 * @param {[number, number, number]} rgb An array of the RGB to use
 * @param {string} t The text to show with the RGB colour
 */
export function rgbBg(rgb: [number, number, number], t: string) {
	if (!enabled) return t;

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
	enabled = true;
};

/**
 * Disable colour support for leeks.js
 */
export function disableColours() {
	enabled = false;
};

export {
	colours as colors,
	supports as supportsColor,
	supports as supportsColour,
	enableColours as enableColors,
	disableColours as disableColors,
	colours,
	keywords,
	bgKeywords,
	styles
};
