const leeks = require('./index.js');

const error = leeks.colors.red;
console.log(error('Error - Everything went YEET'));

console.log(leeks.colors.red('Hello') + leeks.colors.green(' I like leeks!'));
console.log(leeks.colors.bgRed('Hello') + leeks.colors.bgGreen(' I like leeks!'));
console.log(leeks.colors.blue(leeks.styles.underline('Hello!')));
