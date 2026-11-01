const truthy = new Set(['', 'yes', 'true', '1', '2', '3', 'enable', 'e', 'enabled']);
const falsy = new Set(['no', 'false', '0', 'disable', 'd', 'disabled']);
const ciServices = ['GITHUB_ACTIONS', 'TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'BUILDKITE', 'DRONE'];

/**
 * Detect if the current host supports colours.
 */
export function hasColoursSupported(): boolean {
  // Check if we have the `process` global available. If not, let's not enable it.
  if (typeof process === 'undefined') {
    return false;
  }

  const env = process.env;

  // `NO_COLOR` disables colours when set to a non-empty value (https://no-color.org)
  if (env.NO_COLOR) {
    return false;
  }

  // `FORCE_COLOR` (and the legacy `FORCE_COLORS`) override detection
  const force = env.FORCE_COLOR ?? env.FORCE_COLORS;
  if (force !== undefined) {
    if (truthy.has(force)) {
      return true;
    }

    if (falsy.has(force)) {
      return false;
    }
  }

  // Check if any CI service supports colours
  if ('CI' in env) {
    return ciServices.some(i => i in env) || env.CI_NAME === 'codeship';
  }

  // Check if the process' standard output has colours enabled from the `hasColors` function.
  if (typeof process.stdout?.hasColors === 'function') {
    return process.stdout.hasColors();
  }

  // Otherwise, fallback to false
  return false;
}
