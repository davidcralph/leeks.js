/**
 * @module leeks.js
 * @copyright David Ralph (ohlookitsderpy) 2019-2020
 * @license MIT
 */
const d = require('./data.js');

/** Change the colour of the given text. (List: https://derpyenterprises.org/docs/#/leeks) */
let colors = [];
for (let c in d.colors) colors[c] = (t) => `\x1b[${d.colors[c]}m${t}\x1b[0m`;

/** Change the style of the given text. (List: https://derpyenterprises.org/docs/#/leeks) */
let styles = [];
for (let s in d.styles) styles[s] = (t) => `\x1b[${d.styles[s]}m${t}\x1b[0m`;

/**
 * Check if colours are supported.
 * @credit [Colorette](https://github.com/jorgebucaran/colorette)
 */
let supports = !('NO_COLOR' in process.env) && process.env.FORCE_COLOR !== '0' && (process.env.FORCE_COLOR || process.platform === 'win32' || (process.stdout.isTTY && process.env.TERM && process.env.TERM !== 'dumb'));

/**
 * Change the colour of the given text using 8-bit colours.
 * @param {string} i The 8-bit color to use
 * @param {string} t The text to show with the 8-bit colour
 */
module.exports.eightBit = (i, t) => '\033' + `[38;5;${i}m${t}\x1b[0m`;

/**
 * Change the background colour of the given text using 8-bit colours.
 * @param {string} i The 8-bit colour to use
 * @param {string} t The text to show with the 8-bit colour
 */
module.exports.eightBitBg = (i, t) => '\033' + `[48;5;${i}m${t}\x1b[0m`;

/**
 * Change the colour of the given text using RGB.
 * @param {[number, number, number]} rgb An array of the RGB to use
 * @param {string} t The text to show with the RGB colour
 */
module.exports.rgb = (rgb, t) => {
	const [r, g, b] = rgb;
	return '\033' + `[38;2;${r};${g};${b}m${t}\x1b[0m`;
};

/**
 * Change the background colour of the given text using RGB.
 * @param {[number, number, number]} rgb An array of the RGB to use
 * @param {string} t The text to show with the RGB colour
 */
module.exports.rgbBg = (rgb, t) => {
	const [r, g, b] = rgb;
	return '\033' + `[48;2;${r};${g};${b}m${t}\x1b[0m`;
};

/**
 * Change the colour of the given text using hexadecimals.
 * @param {string} hex The hex to use
 * @param {string} t The text to show with the hexadecimal colour
 * @credit [Stack Overflow](https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb)
 */
module.exports.hex = (hex, t) => {
	const bigint = parseInt(hex.replace('#', ''), 16);
	return module.exports.rgb([(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255], t);
};

/**
 * Change the background colour of the given text using hexadecimals.
 * @param {string} hex The hex to use
 * @param {string} t The text to show with the hexadecimal colour
 * @credit [Stack Overflow](https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb)
 */
module.exports.hexBg = (hex, t) => {
	const bigint = parseInt(hex.replace('#', ''), 16);
	return module.exports.rgbBg([(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255], t);
};

module.exports.colors = colors;
module.exports.colours = colors;
module.exports.supportsColor = supports;
module.exports.supportsColour = supports;
module.exports.styles = styles;