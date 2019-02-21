// 25. Get the first n Fibonacci numbers. In the Fibonacci sequence, each subsequent
// number is the sum of the previous two.
// Example: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34.....
// fibonacci(5); // [0,1,1,2,3,5]
// Note: The 0 is not counted.
var fibonacci = function(n) {
  const y = n + 1;
  if (n <= 0) {
    return null;
  }

  if (y === 2) {
    return [0, 1];
  }

  if (y === 1) {
    return [0];
  }

  let prev = fibonacci(n - 1);
  let n1 = prev[prev.length - 1] || 0;
  let n2 = prev[prev.length - 2] || 0;
  let n3 = prev[prev.length - 3] || 0;

  return [...prev, n1 + n2];
};

console.log(fibonacci(5));
