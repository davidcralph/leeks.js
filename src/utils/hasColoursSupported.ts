const isNode = typeof process !== 'undefined';
const truthy = new Set(['yes', 'true', '1', 'enable', 'e', 'enabled']);
const falsy = new Set(['no', 'false', '0', 'disable', 'd', 'disabled']);

/**
 * Method to detect if the current host has colors enabled or not. The result is cached on the first
 * invocation of {@link hasColoursSupported}, the rest will just return that variable.
 */
export function hasColoursSupported() {
  // Check if we have the `process` global available. If not, let's not enable it.
  if (!isNode) {
    return false;
  }

  // Check if the `NO_COLOR` system enviornment variable is available.
  if ('NO_COLOR' in process.env) {
    return false;
  }

  // Check if `FORCE_COLORS` exists and see if it is truthy.
  if ('FORCE_COLORS' in process.env) {
    // Check if it is a truthy value
    if (truthy.has(process.env.FORCE_COLORS)) {
      return true;
    }

    // Check if `FORCE_COLORS` was a falsy value
    if (falsy.has(process.env.FORCE_COLORS)) {
      return true;
    }
  }

  // Check if any CI service supports colours
  if ('CI' in process.env) {
    return ['GITHUB_ACTIONS', 'TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'BUILDKITE', 'DRONE'].some(i => i in process.env) || (
      typeof process.env.CI_NAME !== undefined && process.env.CI_NAME === 'codeship'
    );
  }

  // Check if the process' standard output has colours enabled from the `hasColors` function.
  if (typeof process.stdout?.hasColors !== 'undefined') {
    return process.stdout.hasColors();
  }

  // Otherwise, fallback to false
  console.log('fallback');
  return false;
}
