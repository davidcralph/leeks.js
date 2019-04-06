// Based on https://github.com/thlorenz/ansicolors 

// Declarations
const d = require('./data.js');

// Colours
let colors = [];

for (let k in d.colors) {    
    let op = [],
        cl = [],
        o = op[k] = `\x1b[${d.colors[k]}m`,
        c = cl[k] = '\x1b[0m';
    colors[k] = (s) => { 
        return o + s + c; 
    };
};

// Exports
module.exports.colors = colors;
