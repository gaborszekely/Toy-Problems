// 29. Return the sum of all even numbers in an object containing nested objects.

var nestedEvenSum = function(obj) {
  let newObj = JSON.parse(JSON.stringify(obj));
  let total = 0;

  if (Object.keys(newObj).length === 0) {
    return total;
  }

  for (let key in newObj) {
    if (typeof newObj[key] !== "object") {
      if (newObj[key] % 2 === 0) {
        total += newObj[key];
      }
    } else {
      total += nestedEvenSum(newObj[key]);
    }

    delete newObj[key];
  }

  return total;
};

var obj1 = {
  a: 2,
  b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
  c: { c: { c: 2 }, cc: "ball", ccc: 5 },
  d: 1,
  e: { e: { e: 2 }, ee: "car" }
};

console.log(nestedEvenSum(obj1));

// 10
