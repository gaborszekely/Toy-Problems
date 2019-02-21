const arrCompare = (arr1, arr2) => {
  if (arr1.length === arr2.length) {
    const length = arr1.length;
    for (let i = 0; i < length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
};

const deepCompare = (list, target) => {
  for (let i = 0; i < list.length; i++) {
    if (arrCompare(list[i], target)) {
      return true;
    }
  }
  return false;
};

const deepIndexOf = (list, target) => {
  for (let i = 0; i < list.length; i++) {
    if (arrCompare(list[i], target)) {
      return i;
    }
  }

  return -1;
};

const memoize = function(func) {
  let userArgs = [];
  let results = [];

  return function(...args) {
    if (!deepCompare(userArgs, args)) {
      userArgs.push(args);
      results.push(func(...args));
      return results[results.length - 1];
    }
    const index = deepIndexOf(userArgs, args);
    return results[index];
  };
  /* END SOLUTION */
};

// const addTwo = memoize(function(n) {
//   return n + 2;
// });

// addTwo(3); //?
// addTwo(3) //?

// const addThree = memoize(function (n) {
//   return n + 3;
// });

// addThree(3) //?
// addThree(4) //?
// addThree(3) //?
// addThree(4) //?

const every = (list, predicate) => {
  return list.reduce((acc, item) => {
    if (!predicate(item)) {
      acc = false;
    }

    return acc;
  }, true);
};

const merge = (...args) => Object.assign({}, ...args.slice(1), args[0]);

const obj1 = {
  a: 1,
  b: 2,
  c: 3
};

merge(obj1, { b: 4, c: 2 }, { c: 5, d: 4 }); //?
every([1, 2, 3, 4, 5], item => item > 0); //?

const randomizeArr = arr => {
  let result = [];
  let remaining = [...arr];

  while (remaining.length > 0) {
    let rand = Math.floor(Math.random() * remaining.length);
    let item = remaining[rand];
    result.push(item);
    remaining.splice(rand, 1);
  }

  return result;
};

invoke = function(collection, func, args) {
  return Array.prototype[func].apply(collection, args);
  // const args = Array.prototype.slice.call(arguments, 2);
  // return _.map(collection, function (item) {
  //   if (typeof (func) === 'function') {
  //     return func.apply(item, arg)
  //   }
  // });
};

invoke([3, 2, 1], "sort"); //?
