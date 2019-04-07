# leeks.js
Simple ANSI styling for your terminal. 

## Features
* Ultra lightweight (0 dependencies and under 10kb!)
* Chalk-like API

## Usage
```js
const leeks = require('./index.js');

const error = leeks.colors.red;
console.log(error('Error - Everything went YEET'));

console.log(leeks.colors.red('Hello') + leeks.colors.green(' I like leeks!'));
console.log(leeks.colors.bgRed('Hello') + leeks.colors.bgGreen(' I like leeks!'));
console.log(leeks.colors.blue(leeks.styles.underline('Hello!')));

console.log(leeks.colours.grey('yeet'));
console.log(leeks.colors.gray('yeet'));
```

## Colours
```
black
red
green
yellow
blue
magenta
cyan
white
bgBlack
bgRed
bgGreen
bgYellow
bgBlue
bgMagenta
bgCyan
bgWhite
blackBright
redBright
greenBright
yellowBright
blueBright
magentaBright
cyanBright
whiteBright
bgBlackBright
bgRedBright
bgGreenBright
bgYellowBright
bgBlueBright
bgMagentaBright
bgCyanBright
bgWhiteBright
gray/grey (same as blackBright)
bgGray/bgGrey (same as bgBlackBright)
```
## Styles
```
reset
bold
dim
italic
underline
blink
inverse
strikethrough
```

## Other
``leeks.supportsColour/leeks.supportsColor``

## Credits
[ansicolors](https://github.com/thlorenz/ansicolors) and [ansistyles](https://github.com/thlorenz/ansistyles) - Reference

[colorette](https://github.com/jorgebucaran/colorette) - Colour support checking code