import { afterEach, beforeEach, describe, test } from 'node:test';
import assert from 'node:assert/strict';

import { hasColoursSupported } from './hasColoursSupported.ts';

const keys = ['NO_COLOR', 'FORCE_COLOR', 'FORCE_COLORS', 'CI', 'CI_NAME', 'GITHUB_ACTIONS'];
let saved: Record<string, string | undefined>;

beforeEach(() => {
  saved = Object.fromEntries(keys.map(k => [k, process.env[k]]));
  for (const k of keys) delete process.env[k];
});

afterEach(() => {
  for (const k of keys) {
    if (saved[k] === undefined) delete process.env[k];
    else process.env[k] = saved[k];
  }
});

describe('hasColoursSupported', () => {
  test('NO_COLOR with a value disables colours', () => {
    process.env.NO_COLOR = '1';
    process.env.FORCE_COLOR = '1';
    assert.equal(hasColoursSupported(), false);
  });

  test('empty NO_COLOR is ignored', () => {
    process.env.NO_COLOR = '';
    process.env.FORCE_COLOR = '1';
    assert.equal(hasColoursSupported(), true);
  });

  for (const value of ['1', 'true', '', '3']) {
    test(`FORCE_COLOR=${JSON.stringify(value)} enables colours`, () => {
      process.env.FORCE_COLOR = value;
      assert.equal(hasColoursSupported(), true);
    });
  }

  for (const value of ['0', 'false']) {
    test(`FORCE_COLOR=${value} disables colours`, () => {
      process.env.FORCE_COLOR = value;
      process.env.CI = '1';
      process.env.GITHUB_ACTIONS = 'true';
      assert.equal(hasColoursSupported(), false);
    });
  }

  test('legacy FORCE_COLORS still works', () => {
    process.env.FORCE_COLORS = '0';
    process.env.CI = '1';
    process.env.GITHUB_ACTIONS = 'true';
    assert.equal(hasColoursSupported(), false);
  });

  test('known CI enables colours', () => {
    process.env.CI = '1';
    process.env.GITHUB_ACTIONS = 'true';
    assert.equal(hasColoursSupported(), true);
  });

  test('unknown CI disables colours', () => {
    process.env.CI = '1';
    assert.equal(hasColoursSupported(), false);
  });

  test('codeship CI enables colours', () => {
    process.env.CI = '1';
    process.env.CI_NAME = 'codeship';
    assert.equal(hasColoursSupported(), true);
  });
});
