// 36. Given a string, return a string with digits converted to their word equivalent.
// Assume all numbers are single digits (less than 10).
// numToText("I have 5 dogs and 6 ponies"); // "I have five dogs and six ponies"

var numToText = function(str) {
  if (str.length === 0) {
    return "";
  }

  const regex = /\w+ /;
  const nums = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine"
  ];

  if (!regex.test(str)) {
    if (isNaN(parseInt(str))) {
      return str;
    }

    return parseInt(str);
  }

  const word = str.match(regex)[0];

  if (isNaN(parseInt(word))) {
    return word + numToText(str.slice(word.length));
  }

  return nums[parseInt(str[0])] + " " + numToText(str.slice(2));
};

console.log(numToText("I have 5 dogs and 6 ponies"));
