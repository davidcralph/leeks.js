declare module 'leeks.js' {
    type Styles = 'reset' | 'bold' | 'dim' | 'italic' | 'underline' | 'blink' | 'inverse' | 'strikethrough';
    type Colors = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray' | 'grey' |
        'blackBright' | 'redBright' | 'yellowBright' | 'blueBright' | 'magentaBright' | 'cyanBright' | 'whiteBright' | 'greenBright' |
        'bgBlack' | 'bgRed' | 'bgGreen' | 'bgYellow' | 'bgBlue' | 'bgMagenta' | 'bgCyan' | 'bgWhite' |
        'bgBlackBright' | 'bgRedBright' | 'bgGreenBright' | 'bgBlueBright' | 'bgMagentaBright' | 'bgCyanBright' | 'bgWhiteBright' | 'bgYellowBright' |
        'bgGray' | 'bgGrey';

    /** Alias for `colours` */
    export const colors: { [x in Colors]: (t: string) => string; };

    /** Change the colour of the given text. (List: https://derpyenterprises.org/docs/#/leeks) */
    export const colours: { [x in Colors]: (t: string) => string };

    /** Change the style of the given text. (List: https://derpyenterprises.org/docs/#/leeks) */
    export const styles: { [x in Styles]: (t: string) => string };

    /** Alias for `supportsColour` */
    export const supportsColor: boolean;

    /** Check if colours are supported. (From https://github.com/jorgebucaran/colorette) */
    export const supportsColour: boolean;

    /**
     * Change the background colour of the given text using 8-bit colours.
     * @param i The 8-bit colour to use
     * @param t The text to show with the 8-bit colour
     */
    export const eightBit: (i: string, t: string) => string;

    /**
     * Change the background colour of the given text using 8-bit colours.
     * @param i The 8-bit colour to use
     * @param t The text to show with the 8-bit colour
     */
    export const eightBitBg: (i: string, t: string) => string;

    /**
     * Change the colour of the given text using RGB.
     * @param rgb An array of the RGB to use
     * @param t The text to show with the RGB color
     */
    export const rgb: (rgb: [number, number, number], t: string) => string;

    /**
     * Change the background colour of the given text using RGB.
     * @param rgb An array of the RGB to use
     * @param t The text to show with the RGB colour
     */
    export const rgbBg: (rgb: [number, number, number], t: string) => string;

    /**
     * Change the colour of the given text using hexadecimals.
     * @param {string} hex The hex to use
     * @param {string} t The text to show with the hexadecimal colour
     * @credit [Stack Overflow](https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb)
     */
    export const hex: (hex: string, t: string) => string;

    /**
     * Change the background colour of the given text using hexadecimals.
     * @param {string} hex The hex to use
     * @param {string} t The text to show with the hexadecimal colour
     * @credit [Stack Overflow](https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb)
     */
    export const hexBg: (hex: string, t: string) => string;
}