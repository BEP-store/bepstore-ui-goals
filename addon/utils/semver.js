/*
  type SEMVER = [ number, number, number ];
 */

function parse(str) {
  let regex = /([0-9]+)\.([0-9]+)\.?([0-9]+)?/;
  let match = str.match(regex);
  if (!match) {
    return undefined;
  }

  return match.slice(1);

}

function compare(a, b) {
  /*jshint curly: false */
  if (!a || !b) return undefined;

  if (a[0] > b[0]) return 1;
  if (a[0] < b[0]) return -1;

  if (a[1] > b[1]) return 1;
  if (a[1] < b[1]) return -1;

  if (a[2] > b[2]) return 1;
  if (a[2] < b[2]) return -1;
  /*jshint curly: true */

  return 0;
}

export const semver = {
  parse,
  compare
};

export default semver;
