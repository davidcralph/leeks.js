/**
 * @module leeks.js
 * @copyright David Ralph (ohlookitsderpy) 2019-2020
 * @license MIT
 */
const d = require('./data.js');

/**
 * Change the colour of the given text. (List: https://github.com/ohlookitsderpy/leeks.js/README.md)
 */
let colors = [];
for (let c in d.colors) colors[c] = (t) => `\x1b[${d.colors[c]}m${t}\x1b[0m`;

/**
 * Change the style of the given text. (List: https://github.com/ohlookitsderpy/leeks.js/README.md)
 */
let styles = [];
for (let s in d.styles) styles[s] = (t) => `\x1b[${d.styles[s]}m${t}\x1b[0m`;

/**
 * Check if colours are supported. (From https://github.com/jorgebucaran/colorette)
 */
let supports = !('NO_COLOR' in process.env) && process.env.FORCE_COLOR !== '0' && (process.env.FORCE_COLOR || process.platform === 'win32' || (process.stdout.isTTY && process.env.TERM && process.env.TERM !== 'dumb'));

/**
 * Change the colour of the given text using 8-bit colours.
 * @param {string} i The 8-bit color to use
 * @param {string} t The text to show with the 8-bit color
 */
module.exports.eightBit = (i, t) => '\033' + `[38;5;${i}m${t}\x1b[0m`;

/**
 * Change the background colour of the given text using 8-bit colours.
 * @param {string} i The 8-bit color to use
 * @param {string} t The text to show with the 8-bit color
 */
module.exports.eightBitBg = (i, t) => '\033' + `[48;5;${i}m${t}\x1b[0m`;

/**
 * Change the colour of the given text using RGB.
 * @param {[number, number, number]} rgb An array of the RGB to use
 * @param {string} t The text to show with the RGB color
 */
module.exports.rgb = (rgb, t) => {
	const [r, g, b] = rgb;
	return '\033' + `[38;2;${r};${g};${b}m${t}\x1b[0m`;
};

/**
 * Change the background colour of the given text using RGB.
 * @param {[number, number, number]} rgb An array of the RGB to use
 * @param {string} t The text to show with the RGB color
 */
module.exports.rgbBg = (rgb, t) => {
	const [r, g, b] = rgb;
	return '\033' + `[48;2;${r};${g};${b}m${t}\x1b[0m`;
};

/**
 * Change the colour of the given text using hexadecimals.
 * @param {string} hex The hex to use
 * @param {string} t The text to show with the hexadecimal
 * @credit [Stackoverflow](https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb)
 */
module.exports.hex = (hex, t) => {
	const h = hex.replace('#', '');
	const bigint = parseInt(h, 16);

	const [r, g, b] = [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
	return module.exports.rgb([r, g, b], t);
};

/**
 * Change the background colour of the given text using hexadecimals.
 * @param {string} hex The hex to ue
 * @param {string} t The text to show with the hexadecimal
 * @credit [Stackoverflow](https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb)
 */
module.exports.hexBg = (hex, t) => {
	const h = hex.replace('#', '');
	const bigint = parseInt(h, 16);

	const [r, g, b] = [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
	return module.exports.rgbBg([r, g, b], t);
};

module.exports.colors = colors;
module.exports.colours = colors;
module.exports.supportsColor = supports;
module.exports.supportsColour = supports;
module.exports.styles = styles;