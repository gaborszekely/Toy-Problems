// _.flatten = function (nestedArray, result = []) {

// Get each element down to a single element
// Map that to one big array

function flatten(ary) {
  let result = [];

  for (let i = 0; i < ary.length; i++) {
    let item = ary[i];
    if (!Array.isArray(item)) {
      result.push(item);
    } else {
      var flattened = flatten(item);
      result.push(...flattened);
      // result = [...result, ...flatten(item)];
    }
  }

  return result;
  /* END SOLUTION */
}

var nestedArray = [1, [2], [3, [[[4]]]]];

//flatten(nestedArray); //?

flatten(nestedArray); //?

invoke = function(collection, func, args) {
  const funcOrKey = typeof func === "string" ? collection[func] : func;
  return collection.map(item => funcOrKey.apply(item, args));
};

invoke([[3, 7, 4], [2, 4, 1]], "sort"); //?
