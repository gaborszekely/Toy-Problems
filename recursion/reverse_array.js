// 17. Reverse the order of an array
var reverseArr = function(array) {
  if (array.length === 1) {
    return [array[0]];
  }
  return [...reverseArr(array.slice(1)), array[0]];
};

console.log(reverseArr([3, 2, 1]));
