const leeks = require('./index.js'); // Replace with "leeks.js" if not using from the Git repository

const error = leeks.colors.red;
console.log(error('Error - There were no leeks!'));

console.log(leeks.colors.red('Hello') + leeks.colors.green(' I like leeks!'));
console.log(leeks.colors.bgRed('Hello') + leeks.colors.bgGreen(' I like leeks!'));
console.log(leeks.colors.blue(leeks.styles.underline('Hello!')));

console.log(leeks.colours.grey('Hello!'));
console.log(leeks.colors.gray('Hello!'));

console.log(leeks.eightBit('32', 'hello'));
console.log(leeks.eightBitBg('32', 'hello'));

console.log(leeks.rgb('114', '137', '218', 'hello'));
console.log(leeks.rgbBg('114', '137', '218', 'hello'));

console.log('\e]8;;http://example.com\e\\This is a link\e]8;;\e\\\n')