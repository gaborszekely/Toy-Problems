// 30. Flatten an array containing nested arrays.
// flatten([1,[2],[3,[[4]]],5]); // [1,2,3,4,5]
var flatten = function(array) {
  let ary = [];
  for (let i = 0; i < array.length; i++) {
    if (!Array.isArray(array[i])) {
      ary.push(array[i]);
    } else {
      ary = [...ary, ...flatten(array[i])];
    }
  }

  return ary;
};

console.log(flatten([1, [2], [3, [[4]]], 5]));
