declare module 'leeks.js' {
    type Styles = 'reset' | 'bold' | 'dim' | 'italic' | 'underline' | 'overline' | 'blink' | 'inverse' | 'strikethrough' | 'nostrikethrough' | 'nounderline' | 'nooverline' | 'noblink' | 'noinverse';
    type Colors = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray' | 'grey' |
        'blackBright' | 'redBright' | 'yellowBright' | 'blueBright' | 'magentaBright' | 'cyanBright' | 'whiteBright' | 'greenBright' |
        'bgBlack' | 'bgRed' | 'bgGreen' | 'bgYellow' | 'bgBlue' | 'bgMagenta' | 'bgCyan' | 'bgWhite' |
        'bgBlackBright' | 'bgRedBright' | 'bgGreenBright' | 'bgBlueBright' | 'bgMagentaBright' | 'bgCyanBright' | 'bgWhiteBright' | 'bgYellowBright' |
        'bgGray' | 'bgGrey';
    type Keywords = 'black' | 'silver' | 'gray' | 'white' | 'maroon' | 'red' | 'purple' | 'fuchsia' | 'green' | 'lime' | 'olive' |
        'yellow' | 'navy' | 'blue' | 'teal' | 'aqua' | 'aliceblue' | 'antiquewhite' | 'aquamarine' | 'azure' | 'beige' | 'bisque' | 'blanchedalmond' | 'blueviolet' | 'brown' | 'burlywood' | 'cadetblue' |
        'chartreuse' | 'chocolate' | 'coral' | 'cornflowerblue' | 'cornsilk' | 'crimson' | 'cyan' | 'darkblue' | 'darkcyan' | 'darkgoldenrod' | 'darkgray' | 'darkgreen' | 'darkgrey' | 'darkkhaki' |
        'darkmagenta' | 'darkolivegreen' | 'darkorange' | 'darkorchid' | 'darkred' | 'darksalmon' | 'darkseagreen' | 'darkslateblue' | 'darkslategray' | 'darkslategrey' | 'darkturquoise' | 'darkviolet' |
        'deeppink' | 'deepskyblue' | 'dimgray' | 'dimgrey' | 'dodgerblue' | 'firebrick' | 'floralwhite' | 'forestgreen' | 'gainsboro' | 'ghostwhite' | 'gold' | 'goldenrod' | 'greenyellow' | 'grey' | 'honeydew' |
        'hotpink' | 'indianred' | 'indigo' | 'ivory' | 'khaki' | 'lavender' | 'lavenderblush' | 'lawngreen' | 'lemonchiffon' | 'lightblue' | 'lightcoral' | 'lightcyan' | 'lightgoldenrodyellow' | 'lightgray' | 'lightgreen' |
        'lightgrey' | 'lightpink' | 'lightsalmon' | 'lightseagreen' | 'lightskyblue' | 'lightslategray' | 'lightslategrey' | 'lightsteelblue' | 'lightyellow' | 'limegreen' | 'linen' | 'magenta' | 'mediumaquamarine' | 'mediumblue' |
        'mediumorchid' | 'mediumpurple' | 'mediumseagreen' | 'mediumslateblue' | 'mediumspringgreen' | 'mediumturquoise' | 'mediumvioletred' | 'midnightblue' | 'mintcream' | 'mistyrose' | 'moccasin' | 'navajowhite' | 'oldlace' |
        'olivedrab' | 'orange' | 'orangered' | 'orchid' | 'palegoldenrod' | 'palegreen' | 'paleturquoise' | 'palevioletred' | 'papayawhip' | 'peachpuff' | 'peru' | 'pink' | 'plum' | 'powderblue' | 'rosybrown' | 'royalblue' |
        'saddlebrown' | 'salmon' | 'sandybrown' | 'seagreen' | 'seashell' | 'sienna' | 'skyblue' | 'slateblue' | 'slategray' | 'slategrey' | 'snow' | 'springgreen' | 'steelblue' | 'tan' | 'thistle' | 'tomato' | 'turquoise' |
        'violet' | 'wheat' | 'whitesmoke' | 'yellowgreen';

    /** Alias for `colours` */
    export const colors: {
        [x in Colors]: (t: string) => string;
    };

    /** 
     * Change the colour of the given text (List: https://docs.davidjcralph.co.uk/#/leeks) 
     * @param {string} t The text to change the colour of
     */
    export const colours: {
        [x in Colors]: (t: string) => string
    };

    /** 
     * Change the style of the given text (List: https://docs.davidjcralph.co.uk/#/leeks) 
     * @param {string} t The text to change the style of
     */
    export const styles: {
        [x in Styles]: (t: string) => string
    };

    /** 
     * Change the colour of the given text (List: https://docs.davidjcralph.co.uk/#/leeks) 
     * @param {string} t The text to change the colour of
     */
    export const keywords: {
        [x in Keywords]: (t: string) => string
    };

    /** 
     * Change the background colour of the given text (List: https://docs.davidjcralph.co.uk/#/leeks) 
     * @param {string} t The text to change the colour of
     */
    export const bgKeywords: {
        [x in Keywords]: (t: string) => string
    };

    /** Alias for `supportsColour` */
    export const supportsColor: boolean;

    /** Check if colours are supported (From https://github.com/jorgebucaran/colorette) */
    export const supportsColour: boolean;

    /**
     * Change the background colour of the given text using 8-bit colours
     * @param i The 8-bit colour to use
     * @param t The text to show with the 8-bit colour
     */
    export const eightBit: (i: string, t: string) => string;

    /**
     * Change the background colour of the given text using 8-bit colours
     * @param i The 8-bit colour to use
     * @param t The text to show with the 8-bit colour
     */
    export const eightBitBg: (i: string, t: string) => string;

    /**
     * Change the colour of the given text using RGB
     * @param rgb An array of the RGB to use
     * @param t The text to show with the RGB color
     */
    export const rgb: (rgb: [number, number, number], t: string) => string;

    /**
     * Change the background colour of the given text using RGB
     * @param rgb An array of the RGB to use
     * @param t The text to show with the RGB colour
     */
    export const rgbBg: (rgb: [number, number, number], t: string) => string;

    /**
     * Change the colour of the given text using hexadecimals
     * @param {string} hex The hex to use
     * @param {string} t The text to show with the hexadecimal colour
     * @credit [Stack Overflow](https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb)
     */
    export const hex: (hex: string, t: string) => string;

    /**
     * Change the background colour of the given text using hexadecimals
     * @param {string} hex The hex to use
     * @param {string} t The text to show with the hexadecimal colour
     * @credit [Stack Overflow](https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb)
     */
    export const hexBg: (hex: string, t: string) => string;

    /**
     * Set an alias
     * @param {string} name The name of the alias 
     * @param {string} type Either "colours", "colors" or "styles"
     * @param {string} value The colour/style you want to use, e.g leeks.colours.green
     */
    export type alias = () => void;

    /** Enable colour support for leeks.js */
    export type enableColours = () => void;

    /** Alias for `enableColours` */
    export type enableColors = () => void;

    /** Disable colour support for leeks.js */
    export type disableColours = () => void;

    /** Alias for `disabeColours` */
    export type disableColors = () => void;
}