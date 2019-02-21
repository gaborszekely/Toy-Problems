let ary = [1, 2, 2, 3, 4, 4];

const returnEven = ary => {
  let count = 0;
  let prevItem;
  ary.sort((a, b) => a - b);

  for (let i = 0; i < ary.length; i++) {
    let item = ary[i];
    if (typeof prevItem === "undefined") {
      prevItem = item;
      count++;
    } else {
      if (item === prevItem) {
        if (++count % 2 === 0) {
          return item;
        }
      } else {
        if (count % 2 === 0) {
          return item;
        } else {
          count = 1;
          prevItem = item;
        }
      }
    }
  }

  return null;
};

returnEven(ary); //?
