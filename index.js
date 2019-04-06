// Based on https://github.com/thlorenz/ansicolors and https://github.com/thlorenz/ansistyles

// Declarations
const d = require('./data.js');

// Colours
let colors = [];

for (let k in d.colors) {    
    let op = [],
        cl = [],
        o = op[k] = `\x1b[${d.colors[k]}m`,
        c = cl[k] = '\x1b[0m';
    colors[k] = (s) => { return o + s + c; };
};

// Styles
let styles = [];

for (let k in d.styles) {    
    let op = [],
        cl = [],
        o = op[k] = `\x1b[${d.styles[k]}m`,
        c = cl[k] = '\x1b[0m';
    styles[k] = (s) => { return o + s + c; };
};

// Exports
module.exports.colors  = colors;
module.exports.colours = colors;

module.exports.styles = styles;