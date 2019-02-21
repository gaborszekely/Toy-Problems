const ary = [1, 2, 3, 4, 4, 6, 6, 7, 9, 11, 14];

const binarySearch = (array, item) => {
  if (typeof item !== "number") {
    return false;
  }

  const len = array.length;
  const mid = Math.floor(len / 2);
  const midElem = array[mid]; //?

  if (array.length === 1) {
    return item === array[0];
  }

  if (item === midElem) {
    return true;
  } else if (item < midElem) {
    return binarySearch(array.slice(0, mid), item);
  } else {
    return binarySearch(array.slice(mid), item);
  }
};

binarySearch(ary, 8); //?
