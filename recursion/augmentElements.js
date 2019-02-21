// 33. Augment every element in a list with a new value where each element is an array
// itself.
// augmentElements([[],[3],[7]], 5); // [[5],[3,5],[7,5]]
var augmentElements = function(array, aug) {
  return array.length === 0
    ? []
    : [[...array[0], aug], ...augmentElements(array.slice(1), aug)];
};

console.log(augmentElements([[], [3], [7]], 5));
