// 16. Write a function that accepts a string and creates an array where each letter
// occupies an index of the array.
var createArray = function(str) {
  let arr = [];
  if (str.length === 0) {
    return [];
  }
  if (str.length === 1) {
    return [str[0]];
  }

  return [str[0], ...createArray(str.slice(1))];
};

console.log(createArray("abc"));
