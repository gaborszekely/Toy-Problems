var spiralize = function(size) {
  const spiral = 1;
  const filler = 0;

  // Create final array
  let result = [];
  for (let i = 0; i < size; i++) {
    result.push(new Array(size));
  }

  // Fill in fillers
  for (let row of result) {
    for(let i=0; i<row.length; i++) {
      if (typeof row[i] === "undefined") {
        row[i] = filler;
      }
    }
  }

  // // Fill in spirals
  // for(let i = 0; i < result.length; i++) {
  //   // Odd row
  //   if(i % 2 === 0) {
  //     if (i === 0 || i === result.length - 1) {
  //       result[i] = result[i].map(item => {
  //         return item + 1;
  //       });
  //     } else {

  //     }
  //   // Even row
  //   } else {
  //     //
  //   }

  //   // } else {
  //   //   result[i] = result[i].map((item, index) => {
  //   //     if(index === size - 1) {
  //   //       item++;
  //   //     }

  //   //     return item;
  //   //   });
  //   // }
  // }

  // Remove top row, bottom row, last column;
  let subMatrix = result.reduce((acc, row, i) => {
    acc = acc || [];
    if(i !== 0 && i !== result.length - 1) {
      acc.push(row.filter((item, i) => i !== row.length - 1));
    }

    return acc;
  }, []);
  //.splice(result.length - 1, 1).filter(row => row.splice(row.length - 1, 1));
  console.log(subMatrix);
  // let final = merge(result + spiralize(subMatrix));

  // console.log(final);

  // Return result
  return result;
}
// Step 1:
// Cycle through matrix filling in spirals
// Step 2;
// Cycle through matrix filling in fillers

// General rule of thumb
// Top row and right columns should be covered
// Bottom rows v/ height > 3 should be covered

//Start at top left corner
// Go right until you cant
// Go down until you can't
// Go left until you can't
// Go up until you can't

// Should never touch another '1' that is not in the direction of travel;

// [
//   [1, 1, 1, 1, 1],
//   [0, 0, 0, 0, 1],
//   [1, 1, 1, 0, 1],
//   [1, 0, 0, 0, 1],
//   [1, 1, 1, 1, 1]
// ];

spiralize(5); //?



// Travel of direction is right:
  // First, check where the first index of '1' is in the array
    // Travel right until you get to index - 2

// Direction of travel is down
