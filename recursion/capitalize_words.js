// 27. Given an array of words, return a new array containing each word capitalized.
// var words = ['i', 'am', 'learning', 'recursion'];
// capitalizedWords(words); // ['I', 'AM', 'LEARNING', 'RECURSION']
var capitalizeWords = function(array) {
  return array.length === 0
    ? []
    : [array[0].toUpperCase(), ...capitalizeWords(array.slice(1))];
};

console.log(capitalizeWords(["i", "am", "learning", "recursion"]));
