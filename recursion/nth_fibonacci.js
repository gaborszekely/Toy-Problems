// 26. Return the Fibonacci number located at index n of the Fibonacci sequence.
// [0,1,1,2,3,5,8,13,21]
// nthFibo(5); // 5
// nthFibo(7); // 13
// nthFibo(3); // 2

var nthFibo = function(n) {
  const y = n + 1;
};

/*
var fibonacci = function (n) {
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
*/
