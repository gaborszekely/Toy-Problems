Array.prototype.swap = function(i1, i2) {
  const x = [...this];
  this[i1] = x[i2];
  this[i2] = x[i1];
  return this;
};

Array.prototype.customSort = function(callback) {
  let results = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], this[i + 1]) >= 1) {
      this.swap(i, i + 1);
      results.push(false);
    }
  }

  if (results.some(item => !item)) {
    return this.customSort(callback);
  }

  return this;
};

let ary = [4, 2, 6, 8, 1, 2];

ary.customSort((a, b) => a - b);

const customSort = (ary, callback) => {
  let results = [];
  for (let i = 0; i < ary.length; i++) {
    if (callback(ary[i], ary[i + 1]) >= 1) {
      ary = swap(ary, i, i + 1);

      results.push(false);
    }
  }

  if (results.some(item => !item)) {
    return customSort(ary, callback);
  }

  return ary;
};

customSort(ary, (a, b) => a - b);

let strAry = ["joe", "ben", "carson", "adam"];

strAry.customSort((a, b) => a > b);

function swap(ary, i1, i2) {
  const x = [...ary];
  x[i1] = ary[i2];
  x[i2] = ary[i1];
  return x;
}
