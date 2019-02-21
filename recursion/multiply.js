/*
expect(stringified).to.not.contain("*");
expect(stringified).to.not.contain("/");
expect(stringified).to.not.contain("%");
expect(stringified).to.not.contain("Math");
expect(stringified).to.not.contain("modulo");

CAN DO:
+
-

*/

var multiply = function(num1, num2) {
  if (num1 === 0 || num2 === 0) {
    return 0;
  }

  if (num2 === 1) {
    return num1;
  }

  num2 = num2 > 0 ? num2 - 1 : num2 + 1;
  let x = num2 > 0 ? num1 : num1 - num1 - num1;
  return x + multiply(num1, num2);
};

console.log(multiply(2, -3));
// multiply(4, -2);
// multiply(-2, -2);

function permutations(str) {
  let total = [];

  if (str.length === 1) {
    return str;
  }

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const others = str.slice(0, i) + str.slice(i + 1, str.length);
    const z = permutations(others);

    for (let j = 0; j < z.length; j++) {
      total.push(char + z[j]);
    }
  }

  return total.reduce((acc, item) => {
    if (!acc.includes(item)) {
      acc.push(item);
    }
    return acc;
  }, []);
}
