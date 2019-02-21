// 15. Write a function that compares each character of two strings and returns true if
// both are identical.
// compareStr('house', 'houses') // false
// compareStr('tomato', 'tomato') // true
var compareStr = function(str1, str2) {
  if (str1.length === 0 && str2.length === 0) {
    return true;
  }

  if (str1[0] === str2[0]) {
    return compareStr(str1.slice(1), str2.slice(1));
  }

  return false;
};

console.log(compareStr("abc", "abcd"));
