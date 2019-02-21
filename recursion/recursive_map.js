// 21. Write a recursive version of map.
// rMap([1,2,3], timesTwo); // [2,4,6]
var rMap = function(array, callback) {
  if (array.length === 0) {
    return [];
  }

  return [callback(array[0]), ...rMap(array.slice(1), callback)];
};

const timesTwo = x => x * 2;

console.log(rMap([1, 2, 3], timesTwo));
