const ary = [
  [1, 4, 5, 2], 
  [3, 2, 7]
];

/* 
  1 + getAllCombos(3, 5, 7)
  4 + getAllCombos(3, 5, 7)
  5 + getAllCombos(3, 5, 7)
  2 + getAllCombos(3, 5, 7)

  // Cycle through original array


*/

const getCombos = ary => {
  let results = [];

  // Loop through first ary
  if (ary.length === 1) {
  }

  for (let i = 0; i < ary.length; i++) {
    let current = ary[i];
    let remaining = ary.slice(i + 1);
    let remainingPerms = getCombos(remaining);

    for (let j = 0; j < ary[i].length; j++) {
      let firstItem = 
    }
  }

  //

  return results;
};
