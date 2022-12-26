const leeks = require('../dist/index.js'); // Replace with "leeks.js" if not using from the Git repository

const error = leeks.colors.red;
console.log(error('Error - There were no leeks!'));

console.log(leeks.colors.red('Hello') + leeks.colors.green(' I like leeks!'));
console.log(leeks.colors.bgRed('Hello') + leeks.colors.bgGreen(' I like leeks!'));
console.log(leeks.colors.blue(leeks.styles.underline('Hello!')));

console.log(leeks.styles.underline('Hello'));

console.log(leeks.colours.grey('Hello!'));
console.log(leeks.colors.gray('Hello!'));

console.log(leeks.eightBit(32, 'hello'));
console.log(leeks.eightBitBg(32, 'hello'));

console.log(leeks.rgb([114, 137, 218], 'hello'));
console.log(leeks.rgbBg([114, 137, 218], 'hello'));

console.log(leeks.hex('#7289da', 'hello'));
console.log(leeks.hexBg('#7289da', 'hello'));

console.log(leeks.keywords.aqua('Hello'));
console.log(leeks.bgKeywords.aqua('Hello'));

leeks.disableColours();
console.log(error('test'));

leeks.enableColours();
console.log(error('test'));

console.log(leeks.colours.blue`hello there`);

leeks.alias('primary', 'colours', leeks.colours.green);
console.log(leeks.colours.primary('hi'));

console.log(leeks.short('&!3&0&0 Hello &r &2&o&nworld!&r &lBold&r &nUnderlined&r &oItalic&r &#009999HEX&r &!#009999&0more HEX'));
