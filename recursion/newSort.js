const ary = [7, 2, 4, 5, 5, 7, 1, 2, 9, 5, 8, 3, 3, 1, 7, 8, 3];
let strAry = ["joe", "ben", "carson", "adam"];

function newSort(ary, cb) {
  for (let i = 0; i < ary.length; i++) {
    const f = ary[i];
    const s = ary[i + 1];
    if (cb(f, s) > 0) {
      ary.splice(i, 2, s, f);
      return newSort(ary, cb);
    }
  }
  return ary;
}

console.log(newSort(ary, (a, b) => a - b));
console.log(newSort(strAry, (a, b) => a > b));
