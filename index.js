//* IMPORTS
const d = require('./data.js');

/**Change the colour of the given text. (List: https://github.com/ohlookitsderpy/leeks.js/README.md)*/
let colors = [];
for (let c in d.colors) colors[c] = (t) => { return `\x1b[${d.colors[c]}m` + t + `\x1b[0m`; };

/**Change the style of the given text. (List: https://github.com/ohlookitsderpy/leeks.js/README.md)*/
let styles = [];
for (let s in d.styles) styles[s] = (t) => { return `\x1b[${d.styles[s]}m` + t + '\x1b[0m'; };

/**Check if colours are supported. (From https://github.com/jorgebucaran/colorette)*/
let supports = (process.env.FORCE_COLOR || process.platform === 'win32' || (process.stdout.isTTY && process.env.TERM && process.env.TERM !== 'dumb'));

//* EXPORTS
module.exports.colors         = colors;
module.exports.colours        = colors;
module.exports.supportsColor  = supports;
module.exports.supportsColour = supports;

module.exports.styles = styles;