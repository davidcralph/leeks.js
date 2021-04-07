/**
 * @module leeks.js
 * @copyright David Ralph (ohlookitsderpy) 2019-2021
 * @license MIT
 */
import Colours from './data/Colours';
import Styles from './data/Styles';
import Keywords from './data/Keywords';

/** 
 * Change the colour of the given text (List: https://docs.davidjcralph.co.uk/#/leeks) 
 * @param {string} t The text to change the colour of
 */
let colours = [];
for (const c in Colours) colours[c] = (t: string) => `\x1b[${Colours[c]}m${t}\x1b[0m`;

/** 
 * Change the style of the given text (List: https://docs.davidjcralph.co.uk/#/leeks) 
 * @param {string} t The text to change the colour of
 */
let styles = [];
for (const s in Styles) styles[s] = (t: string) => `\x1b[${Styles[s]}m${t}\x1b[0m`;

/** 
 * Change the colour of the given text using CSS keywords (List: https://docs.davidjcralph.co.uk/#/leeks) 
 * @param {string} t The text to change the colour of
 */
let keywords = [];
for (const k in Keywords) keywords[k] = (t: string) => rgb(Keywords[k], t);

/**
 * Check if colours are supported
 * @credit [Colorette](https://github.com/jorgebucaran/colorette)
 */
const supports: string | boolean = !('NO_COLOR' in process.env) && process.env.FORCE_COLOR !== '0' && (process.env.FORCE_COLOR || process.platform === 'win32' || (process.stdout.isTTY && process.env.TERM && process.env.TERM !== 'dumb'));

/**
 * Change the colour of the given text using 8-bit colours
 * @param {string} i The 8-bit colour to use
 * @param {string} t The text to show with the 8-bit colour
 */
export function eightBit (i: string, t: string) {
	return '\033' + `[38;5;${i}m${t}\x1b[0m`;
}

/**
 * Change the background colour of the given text using 8-bit colours
 * @param {string} i The 8-bit colour to use
 * @param {string} t The text to show with the 8-bit colour
 */
export function eightBitBg (i: string, t: string) {
	return '\033' + `[48;5;${i}m${t}\x1b[0m`;
}

/**
 * Change the colour of the given text using RGB
 * @param {[number, number, number]} rgb An array of the RGB to use
 * @param {string} t The text to show with the RGB colour
 */
export function rgb (rgb: [number, number, number], t: string) {
	const [r, g, b] = rgb;
	return '\033' + `[38;2;${r};${g};${b}m${t}\x1b[0m`;
};

/**
 * Change the background colour of the given text using RGB
 * @param {[number, number, number]} rgb An array of the RGB to use
 * @param {string} t The text to show with the RGB colour
 */
export function rgbBg (rgb: [number, number, number], t: string) {
	const [r, g, b] = rgb;
	return '\033' + `[48;2;${r};${g};${b}m${t}\x1b[0m`;
};

/**
 * Change the colour of the given text using hexadecimals
 * @param {string} hex The hex to use
 * @param {string} t The text to show with the hexadecimal colour
 * @credit [Stack Overflow](https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb)
 */
export function hex (hex: string, t: string) {
	const bigint = parseInt(hex.replace('#', ''), 16);
	return rgb([(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255], t);
};

/**
 * Change the background colour of the given text using hexadecimals
 * @param {string} hex The hex to use
 * @param {string} t The text to show with the hexadecimal colour
 * @credit [Stack Overflow](https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb)
 */
export function hexBg (hex: string, t: string) {
	const bigint = parseInt(hex.replace('#', ''), 16);
	return rgbBg([(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255], t);
};

export { colours as colors };
export { colours };
export { keywords };
export { supports as supportsColor };
export { supports as supportsColour };
export { styles };