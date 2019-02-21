// 28. Given an array of strings, capitalize the first letter of each index.
// capitalizeFirst(['car','poop','banana']); // ['Car','Poop','Banana']
var capitalizeFirst = function(array) {
  return array.length === 0
    ? []
    : [
        array[0][0].toUpperCase() + array[0].slice(1),
        ...capitalizeFirst(array.slice(1))
      ];
};
