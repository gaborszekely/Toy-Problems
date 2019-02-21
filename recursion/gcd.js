// 14. Find the greatest common divisor (gcd) of two positive numbers. The GCD of two
// integers is the greatest integer that divides both x and y with no remainder.
// gcd(4,36); // 4
// http://www.cse.wustl.edu/~kjg/cse131/Notes/Recursion/recursion.html
// https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/the-euclidean-algorithm
/*
If A = 0 then GCD(A,B)=B, since the GCD(0,B)=B, and we can stop.
If B = 0 then GCD(A,B)=A, since the GCD(A,0)=A, and we can stop.
Write A in quotient remainder form (A = B⋅Q + R)
Find GCD(B,R) using the Euclidean Algorithm since GCD(A,B) = GCD(B,R)
*/
var gcd = function(a, b) {
  if (a < 0 || b < 0) {
    return null;
  }

  if (a === 0) {
    return b;
  }
  if (b === 0) {
    return a;
  }

  let mod = a % b;
  return gcd(b, mod);
};

console.log(gcd(270, 192));

console.log(270 % 192);
