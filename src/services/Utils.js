/**
 * @param obj {any}
 * @returns {string}
 */
export const getType = (obj) => Object.prototype.toString.call(obj).slice(8, -1);

export const findComparison = (item, search) => {
  let regExp;
  try {
    regExp = new RegExp(search)
  } catch (err) {
    return false;
  }
  switch (getType(item)) {
    case 'Array': {
      return filter(item, search).length !== 0;
    }
    case 'Object': {
      const filtered = filterObject(item, search);
      return Object.keys(filtered).length !== 0;
    }
    case 'Date': {
      item = item.toLocaleString();
      break;
    }
    default: {
      item = String(item);
      break;
    }
  }
  return regExp.test(item.toLowerCase());
};

/**
 * Doing search by string/regexp in Array
 * @param array {Array}
 * @param search {string | RegExp}
 * @returns {Array}
 */
export const filter = (array, search) =>
  array
    .filter(item => findComparison(item, search));

/**
 * Doing search by string/regexp in Object
 * @param obj {object}
 * @param search {string | RegExp}
 * @returns {object}
 */
export const filterObject = (obj, search) =>
  Object
    .entries(obj)
    .filter(([ key, value ]) => findComparison(value, search))
    .reduce((accum, [ key, value ]) => Object.assign(accum, { [key]: value }), {});
