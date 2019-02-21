const ary = [1, 1, 1, 2, 2, 3, 4, 4, 4, 5];
console.log(binary(ary, 4));
// Looking for '4'

function binary(array, item) {
  let result = Math.floor(array.length / 2);

  const inner = (array, item) => {
    const midpoint = Math.floor(array.length / 2);
    const midElem = array[midpoint];
    let subArray;

    if (array.length === 1) {
      if (array[0] === item) {
        return result;
      }
      return -1;
    }

    if (item === midElem) {
      if (array[midpoint - 1] < item) {
        return result;
      }
    }

    if (item <= midElem) {
      subArray = array.slice(0, midpoint);
      const diff = subArray.length - Math.floor(subArray.length / 2); //?
      result -= diff; //?
      return inner(subArray, item);
    } else {
      // ISSUE IS HERE
      subArray = array.slice(midpoint + 1);
      const diff = subArray.length - Math.floor(subArray.length / 2); //?
      result += diff; //?
      return inner(subArray, item);
    }
  };

  return inner(array, item);
}

// const binarySearch = function(array, item, currentMidpoint) {
//   const midpoint = Math.floor(array.length / 2);
//   const midElem = array[midpoint];
//   let subArray;

//   if (typeof currentMidpoint === "undefined") {
//     currentMidpoint = midpoint;
//   }

//   console.log(currentMidpoint);
//   console.log(array);

//   if (array.length === 0) {
//     return -1;
//   }

//   if (array.length === 2) {
//     if (array[0] === item) {
//       return currentMidpoint - 2;
//     } else if (array[0] === item) {
//       return currentMidpoint - 1;
//     }
//     return -1;
//   }

//   if (array.length === 1) {
//     if (item === array[0]) {
//       return currentMidpoint;
//     }
//     return -1;
//   }

//   if (item === midElem) {
//     if (array[midpoint - 1] < midElem) {
//       return currentMidpoint;
//     }
//   }

//   if (item <= midElem) {
//     subArray = array.slice(0, midpoint); //?
//     return binarySearch(
//       subArray,
//       item,
//       currentMidpoint - (subArray.length - Math.floor(subArray.length / 2))
//     );
//   } else {
//     subArray = array.slice(midpoint + 1);
//     return binarySearch(
//       subArray,
//       item,
//       currentMidpoint + (subArray.length - Math.floor(subArray.length / 2))
//     );
//   }
// };
