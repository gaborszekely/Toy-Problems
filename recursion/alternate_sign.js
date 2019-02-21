// 35. Alternate the numbers in an array between positive and negative regardless of
// their original sign. The first number in the index always needs to be positive.
// alternateSign([2,7,8,3,1,4]) // [2,-7,8,-3,1,-4]
// alternateSign([-2,-7,8,3,-1,4]) // [2,-7,8,-3,1,-4]
var alternateSign = function(array) {
  if (array.length === 1) {
    return [array[0] >= 0 ? array[0] : array[0] * -1];
  }
  if (array.length === 2) {
    return [
      array[0] >= 0 ? array[0] : array[0] * -1,
      array[1] < 0 ? array[1] : array[1] * -1
    ];
  }

  let first = array[0] >= 0 ? array[0] : array[0] * -1;
  let second = array[1] < 0 ? array[1] : array[1] * -1;

  return [first, second, ...alternateSign(array.slice(2))];
};
