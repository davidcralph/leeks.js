import { before, describe, test } from 'node:test';
import assert from 'node:assert/strict';

import colours from './data/Colours.ts';
import styles from './data/Styles.ts';
import keywords from './data/Keywords.ts';

import * as leeks from './index.ts';
import leeksDefault from './index.ts';

// Detection runs at import time and stdout is piped under `node --test`, so force colours on
before(() => leeks.enableColours());

const esc = (code: string | number) => `\x1b[${code}m`;

function withColoursDisabled(fn: () => void) {
  leeks.disableColours();
  try {
    fn();
  } finally {
    leeks.enableColours();
  }
}

describe('Colours and background colours', () => {
  for (const [name, code] of Object.entries(colours)) {
    const close = name.startsWith('bg') ? 49 : 39;
    const colour = name as keyof typeof colours;

    test(`colour '${name}' resolves while enabled`, () => {
      assert.equal(leeks.colors[colour]('test'), `${esc(code)}test${esc(close)}`);
    });

    test(`colour '${name}' is a no-op while disabled`, () => {
      withColoursDisabled(() => assert.equal(leeks.colors[colour]('test'), 'test'));
    });
  }
});

describe('Styles', () => {
  for (const name of Object.keys(styles)) {
    const style = name as keyof typeof styles;

    test(`style '${name}' opens with its code while enabled`, () => {
      assert.ok(leeks.styles[style]('test').startsWith(`${esc(styles[style])}test`));
    });

    test(`style '${name}' is a no-op while disabled`, () => {
      withColoursDisabled(() => assert.equal(leeks.styles[style]('test'), 'test'));
    });
  }

  test('styles close with their own close code', () => {
    assert.equal(leeks.styles.bold('test'), `${esc(1)}test${esc(22)}`);
    assert.equal(leeks.styles.underline('test'), `${esc(4)}test${esc(24)}`);
    assert.equal(leeks.styles.reset('test'), `${esc(0)}test${esc(0)}`);
  });

  test('"off" styles have no close code', () => {
    assert.equal(leeks.styles.nounderline('test'), `${esc(24)}test`);
  });
});

describe('Keywords', () => {
  for (const [name, [r, g, b]] of Object.entries(keywords)) {
    const keyword = name as keyof typeof keywords;

    test(`keyword '${name}' resolves while enabled`, () => {
      assert.equal(leeks.keywords[keyword]('test'), `${esc(`38;2;${r};${g};${b}`)}test${esc(39)}`);
      assert.equal(leeks.bgKeywords[keyword]('test'), `${esc(`48;2;${r};${g};${b}`)}test${esc(49)}`);
    });

    test(`keyword '${name}' is a no-op while disabled`, () => {
      withColoursDisabled(() => {
        assert.equal(leeks.keywords[keyword]('test'), 'test');
        assert.equal(leeks.bgKeywords[keyword]('test'), 'test');
      });
    });
  }
});

describe('8-bit, RGB and hex', () => {
  test('eightBit', () => {
    assert.equal(leeks.eightBit(32, 'test'), `${esc('38;5;32')}test${esc(39)}`);
    assert.equal(leeks.eightBitBg(32, 'test'), `${esc('48;5;32')}test${esc(49)}`);
  });

  test('rgb', () => {
    assert.equal(leeks.rgb([114, 137, 218], 'test'), `${esc('38;2;114;137;218')}test${esc(39)}`);
    assert.equal(leeks.rgbBg([114, 137, 218], 'test'), `${esc('48;2;114;137;218')}test${esc(49)}`);
  });

  test('6-digit hex', () => {
    assert.equal(leeks.hex('#7289da', 'test'), leeks.rgb([114, 137, 218], 'test'));
    assert.equal(leeks.hexBg('7289da', 'test'), leeks.rgbBg([114, 137, 218], 'test'));
  });

  test('3-digit hex expands', () => {
    assert.equal(leeks.hex('#f80', 'test'), leeks.rgb([255, 136, 0], 'test'));
    assert.equal(leeks.hexBg('#fff', 'test'), leeks.rgbBg([255, 255, 255], 'test'));
  });
});

describe('Nesting', () => {
  test('same type: outer colour re-opens after inner colour', () => {
    const { red, blue } = leeks.colours;
    assert.equal(red(`a${blue('b')}c`), `${esc(31)}a${esc(34)}b${esc(39)}${esc(31)}c${esc(39)}`);
  });

  test('cross type: style inside colour keeps the colour', () => {
    const out = leeks.colours.red(leeks.styles.bold('a') + 'b');
    assert.equal(out, `${esc(31)}${esc(1)}a${esc(22)}b${esc(39)}`);
  });

  test('bold inside dim re-opens dim (shared close code 22)', () => {
    const out = leeks.styles.dim(`a${leeks.styles.bold('b')}c`);
    assert.equal(out, `${esc(2)}a${esc(1)}b${esc(22)}${esc(2)}c${esc(22)}`);
  });

  test('hex inside foreground colour re-opens the colour', () => {
    const out = leeks.colours.red(leeks.hex('#fff', 'a') + 'b');
    assert.equal(out, `${esc(31)}${esc('38;2;255;255;255')}a${esc(39)}${esc(31)}b${esc(39)}`);
  });

  test('background inside foreground does not interfere', () => {
    const out = leeks.colours.red(leeks.colours.bgBlue('a') + 'b');
    assert.equal(out, `${esc(31)}${esc(44)}a${esc(49)}b${esc(39)}`);
  });
});

describe('short()', () => {
  test('colours, backgrounds and styles', () => {
    assert.equal(leeks.short('&4&!1&lhi'), `${esc(31)}${esc(44)}${esc(1)}hi${esc(0)}`);
  });

  test('codes are case-insensitive', () => {
    assert.equal(leeks.short('&A&Lhi'), leeks.short('&a&lhi'));
    assert.ok(!leeks.short('&A&L&!Bhi').includes('undefined'));
  });

  test('6 and 3 digit hex', () => {
    assert.equal(leeks.short('&#7289dahi'), `${esc('38;2;114;137;218')}hi${esc(0)}`);
    assert.equal(leeks.short('&!#fffhi'), `${esc('48;2;255;255;255')}hi${esc(0)}`);
  });

  test('strips codes while disabled', () => {
    withColoursDisabled(() => assert.equal(leeks.short('&4&lhi &#fff&rthere'), 'hi there'));
  });
});

describe('Misc', () => {
  test('tagged template call does not throw', () => {
    // @ts-expect-error tagged template calls aren't part of the typed API, but have always worked
    assert.equal(leeks.colours.blue`hi`, `${esc(34)}hi${esc(39)}`);
  });

  test('alias', () => {
    leeks.alias('primary', 'colours', leeks.colours.green);
    assert.equal((leeks.colours as Record<string, leeks.StyleFn>).primary!('hi'), leeks.colours.green('hi'));
    // @ts-expect-error invalid type
    assert.throws(() => leeks.alias('x', 'nope', leeks.colours.green));
  });

  test('default export mirrors named exports, with live supportsColor', () => {
    assert.equal(leeksDefault.colours.red('hi'), leeks.colours.red('hi'));
    leeksDefault.disableColours();
    assert.equal(leeksDefault.supportsColor, false);
    leeksDefault.enableColours();
    assert.equal(leeksDefault.supportsColour, true);
  });

  test('supportsColor is a live binding', () => {
    leeks.disableColours();
    assert.equal(leeks.supportsColor, false);
    leeks.enableColors();
    assert.equal(leeks.supportsColour, true);
  });
});
