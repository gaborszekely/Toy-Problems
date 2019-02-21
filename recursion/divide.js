/*
expect(divide(2, 1)).to.equal(~~(2 / 1));
expect(divide(17, 5)).to.equal(~~(17 / 5));
expect(divide(78, 453)).to.equal(~~(78 / 453));
expect(divide(-79, 82)).to.equal(~~(-79 / 82));
expect(divide(-275, -582)).to.equal(~~(-275 / -582));
expect(divide(0, 32)).to.equal(~~(0 / 32));
expect(divide(0, 0)).to.be.NaN;
*/

var divide = function(num, divisor) {
  const abs = x => (x >= 0 ? x : x - x - x);
  if (abs(num) < abs(divisor)) {
    return 0;
  }
  if (divisor === 0) {
    return NaN;
  }
  return 1 + divide(num - divisor, divisor);
};

console.log(divide(2, 1));
console.log(divide(17, 5));
console.log(divide(78, 453));
console.log(divide(-79, 82));
console.log(divide(-275, -582));
console.log(divide(0, 32));
console.log(divide(0, 0));

console.log(~~(2 / 1));
console.log(~~(17 / 5));
console.log(~~(78 / 453));
console.log(~~(-79 / 82));
console.log(~~(-275 / -582));
console.log(~~(0 / 32));
console.log(0 / 0);
