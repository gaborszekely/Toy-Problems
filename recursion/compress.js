// 32. Eliminate consecutive duplicates in a list. If the list contains repeated
// elements they should be replaced with a single copy of the element. The order of the
// elements should not be changed.
// compress([1,2,2,3,4,4,5,5,5]) // [1,2,3,4,5]
// compress([1,2,2,3,4,4,2,5,5,5,4,4]) // [1,2,3,4,2,5,4]
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

console.log(compress([1, 2, 2, 3, 4, 4, 2, 5, 5, 5, 4, 4]));
