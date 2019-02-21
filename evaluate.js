/*
Operators
You need to support the following mathematical operators:

Multiplication *
Division / (as true division)
Addition +
Subtraction -
Operators are always evaluated from left-to-right, and * and / must be evaluated before + and -.

Parentheses
You need to support multiple levels of nested parentheses, ex. (2 / (2 + 3.33) * 4) - -6

Whitespace
There may or may not be whitespace between numbers and operators.

An addition to this rule is that the minus sign (-) used for negating numbers and parentheses will never be separated by whitespace. I.e., all of the following are valid expressions.
1-1    // 0
1 -1   // 0
1- 1   // 0
1 - 1  // 0
1- -1  // 2
1 - -1 // 2

6 + -(4)   // 2
6 + -( -4) // 10
And the following are invalid expressions

1 - - 1    // Invalid
1- - 1     // Invalid
6 + - (4)  // Invalid
6 + -(- 4) // Invalid
Validation
You do not need to worry about validation - you will only receive valid mathematical expressions following the above rules.

NOTE: Both eval and Function are disabled. Same goes for String.match.
*/

/*
GROUND RULES:
  - Parenthesis
  - Order of operations
  - Subtraction can also be minus sign
  - Whitespace

  Go until hit parenthesis or end
*/

var checkNum = num => !isNaN(parseInt(current));

const parseNumber = str => {
  let val = "";
  let index = 0;
  for (let i = 0; i < str.length; i++) {
    let current = str[i];
    if (checkNum(current) || current === ".") {
      val += current;
    } else {
      index = i - 1;
    }
  }
  return [val, index];
};

const parseParen = str => {
  let openCt = 0;
  let closCt = 0;
  let isOpen = false;

  let index = 0;
  for (let i = 0; i < str.length; i++) {
    let current = str[i];
    if (checkNum(current) || current === ".") {
      val += current;
    } else {
      index = i - 1;
    }
  }
  return [val, index];
};

const splitByOperator = str => {
  const operators = ["+", "-", "/", "*", "(", ")"];
  let final = [],
    openCt = 0,
    closCt = 0,
    isOpen = false,
    isNum = false,
    numStI = 0,
    numEndI = 0;

  for (let i = 0; i < str.length; i++) {
    let current = str[i];

    let current = expression[i];

    if (operators.includes(current)) {
      // Check for negative
      if (!isNegative(str, i)) {
        final.push(current);
      }
    }

    if (checkNum(current)) {
      // Keep going until hit whitespace or operator
      // try to parse as number
      // parseNumber();
      let [num, index] = parseNumber(expression.slice(i));
      if (!isNaN(parseFloat(num))) {
        final.push(num);
      } else {
        throw new Error("Invalid expression");
      }
      i += index;
    }
  }
  return [val, index];
};

var calc = function(expression) {
  const split = splitByOperator(expression);
};
