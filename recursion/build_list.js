// 18. Create a new array with a given value and length.
// buildList(0,5) // [0,0,0,0,0]
// buildList(7,3) // [7,7,7]
var buildList = function(value, length) {
  if (length === 0) {
    return [];
  }
  return length === 1 ? [value] : [value, ...buildList(value, length - 1)];
};

console.log(buildList(0, 5));
