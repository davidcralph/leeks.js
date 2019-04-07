// Based on https://github.com/thlorenz/ansicolors and https://github.com/thlorenz/ansistyles

// Declarations
const d = require('./data.js');

/**Change the colour of the given text! (List: https://github.com/ohlookitsderpy/leeks.js/README.md)*/
let colors = [];

for (let k in d.colors) {    
    let op = [],
        cl = [],
        o = op[k] = `\x1b[${d.colors[k]}m`,
        c = cl[k] = '\x1b[0m';
    colors[k] = (s) => { return o + s + c; };
};

/**Change the style of the given text! (List: https://github.com/ohlookitsderpy/leeks.js/README.md)*/
let styles = [];

for (let k in d.styles) {    
    let op = [],
        cl = [],
        o = op[k] = `\x1b[${d.styles[k]}m`,
        c = cl[k] = '\x1b[0m';
    styles[k] = (s) => { return o + s + c; };
};

/**Check if colours are supported. (From https://github.com/jorgebucaran/colorette)*/
let supported = (process.env.FORCE_COLOR || process.platform === 'win32' || (process.stdout.isTTY && process.env.TERM && process.env.TERM !== 'dumb'));

// EXPORTS
module.exports.colors         = colors;
module.exports.colours        = colors;
module.exports.supportsColor  = supported;
module.exports.supportsColour = supported;

// Grey is the common spelling used in the UK/Canada, Gray is the USA spelling
module.exports.colors.gray    = colors.blackBright;
module.exports.colours.grey   = colors.blackBright;
module.exports.colors.bgGray  = colors.bgBlackBright;
module.exports.colours.bgGrey = colors.bgBlackBright;

module.exports.styles = styles;