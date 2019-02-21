/*
 - No *
 - No /
 - No %
 - No Math
*/

// var modulo = function(num, divisor) {
//   let x = num < 0 && divisor < 0 ? -1 : 1;
//   const abs = x => (x >= 0 ? x : x - x - x);

//   if (divisor === 0) {
//     return NaN;
//   }

//   if (abs(num) < abs(divisor) || num === 0) {
//     return num;
//   }

//   if (abs(num) - x * divisor >= x * divisor) {
//     num = num < 0 ? num + divisor : num - divisor;
//     return modulo(num, divisor);
//   }

//   return x * (abs(num) - x * divisor);
// };

/*
  - Keep muliplying divisor until num-product(divisors) <= divisor
  - return num-product(divisors)


  5, 2
  5 - (2 * 2)
  5 - 4
  1

  5 - 2
  3 -2 
  1


  14, 4
  10, 4
  6, 4
  2, 4
  2

  - Keep subtracting divisor from num until num < divisor
  - return num
*/

var modulo = function(num, divisor) {
  const abs = x => (x >= 0 ? x : x - x - x);
  if (divisor === 0) return NaN;

  if (num >= 0 && divisor < 0) return 0;
  if (num < 0 && divisor > 0 && divisor < abs(num)) return 0;
  if (abs(num) < abs(divisor)) return num;
  return modulo(num - divisor, divisor);
};

//
//
//
//
//
//
//
//
//
//

console.log(modulo(12, 5));
console.log(modulo(5, 3));

console.log(12 % -4);
console.log(modulo(12, -4));

console.log(modulo(-79, 82));
console.log(-79 % 82);

console.log(modulo(-275, -502));
console.log(-275 % -502);

console.log(modulo(-275, -274));
console.log(-275 % -274);

console.log(modulo(-10, 2));
console.log(-10 % 2);

/*
expect(modulo(-79, 82)).to.equal(-79 % 82);
expect(modulo(-275, -502)).to.equal(-275 % -502);
expect(modulo(-275, -274)).to.equal(-275 % -274);
expect(modulo(-4, 2)).to.equal(-4 % 2);
*/
