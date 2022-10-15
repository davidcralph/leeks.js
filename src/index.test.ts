import colours from './data/Colours';
import styles from './data/Styles';
import keywords from './data/Keywords';

import * as leeks from '.';

describe('Colors and background colours', () => {
  for (const [name, code] of Object.entries(colours)) {
    test(`Expect color '${name}' to resolve correctly while enabled`, () => {
      const expected = `\x1b[${code}mtest\x1b[0m`;
      expect(leeks.colors[name]('test')).toBe(expected);
    });
  }

  for (const name of Object.keys(colours)) {
    test(`Expect color '${name}' to resolve correctly without being enabled`, () => {
      leeks.disableColours();

      const expected = 'test';
      expect(leeks.colors[name]('test')).toBe(expected);

      leeks.enableColours();
    });
  }
});

describe('Styles', () => {
  for (const [name, code] of Object.entries(styles)) {
    test(`Expect style '${name}' to resolve correctly while enabled`, () => {
      const expected = `\x1b[${code}mtest\x1b[0m`;
      expect(leeks.styles[name]('test')).toBe(expected);
    });
  }

  for (const name of Object.keys(styles)) {
    test(`Expect style '${name}' to resolve correctly without being enabled`, () => {
      leeks.disableColours();

      const expected = 'test';
      expect(leeks.styles[name]('test')).toBe(expected);

      leeks.enableColours();
    });
  }
});

describe('Keywords', () => {
  for (const [name, [r, g, b]] of Object.entries(keywords)) {
    test(`Expect keyword '${name}' to resolve correctly while colours are enabled`, () => {
      const expected = '\033' + `[38;2;${r};${g};${b}mtest\x1b[0m`;
      expect(leeks.keywords[name]('test')).toBe(expected);
    });
  }

  for (const name of Object.keys(keywords)) {
    test(`Expect keyword '${name}' to resolve correctly while colours are disabled`, () => {
      leeks.disableColors();

      const expected = 'test';
      expect(leeks.keywords[name]('test')).toBe(expected);

      leeks.enableColors();
    });
  }
});
