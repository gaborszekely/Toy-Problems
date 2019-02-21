/*
Given a string of even and odd numbers, find which is the sole even number or the sole odd number.

The return value should be 1-indexed, not 0-indexed.

example:

detectOutlierValue("2 4 7 8 10"); // => 3 - Third number is odd, while the rest of the numbers are even
detectOutlierValue("1 10 1 1");  //=> 2 - Second number is even, while the rest of the numbers are odd
*/

var detectOutlierValue = str => {
  const nums = str
    .split(" ")
    .reduce(
      (acc, item, i) =>
        item % 2 === 0
          ? { ...acc, evens: acc.evens ? [...acc.evens, i + 1] : [i + 1] }
          : { ...acc, odds: acc.odds ? [...acc.odds, i + 1] : [i + 1] },
      {}
    );
  return nums.evens.length === 1 ? nums.evens[0] : nums.odds[0];
};

/*
var detectOutlierValue = str => {
  const nums = str.split(" ").reduce((acc, item, i) => {
    if(item % 2 === 0) {
      if(acc.evens) {
        acc = {...acc, evens: [...acc.evens, i + 1]}
      } else {
        acc = {...acc, evens: [i+1]};
      }
    } else {
      if (acc.odds) {
        acc = { ...acc, odds: [...acc.odds, i + 1] }
      } else {
      acc = { ...acc, odds: [i + 1] };
      }
    }

    return acc;

  }, {});
  return nums.evens.length === 1 ? nums.evens[0] : nums.odds[0];
};

*/
console.log(detectOutlierValue("2 4 7 8 10"));
console.log(detectOutlierValue("1 10 1 1"));

// var detectOutlier = str => str.split(" ").reduce((acc, item) => {}, [])
