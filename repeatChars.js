// function firstNonRepeatingLetter(s) {
//   for (var i of s) {
//     console.log(i);
//     console.log(s.match(new RegExp(i, "gi")));
//     if (s.match(new RegExp(i, "gi")).length === 1) {
//       return i;
//     }
//   }
//   return "";
// }

// firstNonRepeatingLetter("stress"); //?

repeatChar = str => {
  let res = new Map();
  for (char of str) {
    const value = res.has(char) ? res.get(char) + 1 : 1;
    res.set(char, value);
  }

  for (let [key, value] of res) {
    if (value === 1) {
      return key;
    }
  }
  return "";
};

repeatChar("stress"); //?

var str = "strMatch IS a gameChanger";
const regex = /\B[A-Z]\B/g;
str.replace(regex, (match, p1) => {
  return "-" + match.toLowerCase();
}); //?

const set = new Set([2, 1, 3, 4, 5, 2, 4, 7, 3, 2, 6, 5]);

[...new Set(set)].sort((a, b) => a - b); //?
set.add(14); //?
set.delete(2); //?
set.has(2); //?
set.size; //?
//set.entries(); //?
//set.values(); //?
set.forEach(console.log);
