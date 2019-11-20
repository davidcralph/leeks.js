declare module 'leeks.js' {
    type Styles = 'reset' | 'bold' | 'dim' | 'italic' | 'underline' | 'blink' | 'inverse' | 'strikethrough';
    type Colors = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray' | 'grey' |
    'blackBright' | 'redBright' | 'yellowBright' | 'blueBright' | 'magentaBright' | 'cyanBright' | 'whiteBright' | 'greenBright' |
    'bgBlack' | 'bgRed' | 'bgGreen' | 'bgYellow' | 'bgBlue' | 'bgMagenta' | 'bgCyan' | 'bgWhite' |
    'bgBlackBright' | 'bgRedBright' | 'bgGreenBright' | 'bgBlueBright' | 'bgMagentaBright' | 'bgCyanBright' | 'bgWhiteBright' | 'bgYellowBright' |
    'bgGray' | 'bgGrey';
    
    export const colors: { [x in Colors]: (t: string) => string; };
    export const colours: { [x in Colors]: (t: string) => string };
    export const styles: { [x in Styles]: (t: string) => string };
    export const supportsColor: boolean;
    export const supportsColour: boolean;
    export const eightBit: (i: string, t: string) => string;
    export const eightBitBg: (i: string, t: string) => string;
    export const rgb: (r: number, g: number, b: number, t: string) => string;
    export const rgbBg: (r: number, g: number, b: number) => string;
}