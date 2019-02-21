// 34. Reduce a series of zeroes to a single 0.
// minimizeZeroes([2,0,0,0,1,4]) // [2,0,1,4]
// minimizeZeroes([2,0,0,0,1,0,0,4]) // [2,0,1,0,4]
var minimizeZeroes = function(array) {
  if (array.length === 0) {
    return [];
  }

  let first = array[0];
  let second = array[1];

  if (first !== 0) {
    array = [first, ...minimizeZeroes(array.slice(1))];
  } else {
    if (second === first) {
      array = minimizeZeroes(array.slice(1));
    } else {
      array = [first, ...minimizeZeroes(array.slice(1))];
    }
  }

  return array;
};

console.log(minimizeZeroes([2, 0, 0, 0, 1, 0, 0, 4]));
/*
var compress = function(list) {
  if (list.length === 0) {
    return [];
  }
  let first = list[0];
  let second = list[1];

  list =
    first !== second
      ? [first, ...compress(list.slice(1))]
      : compress(list.slice(1));

  return list;
};
*/
