const after = (fn, ct) => {
  let count = 0;

  return function(...args) {
    count++;
    if (count >= ct) {
      return fn(...args);
    }
  };
};

const fn = x => x + 1;

const afterFn = after(fn, 3);

console.log(afterFn(1));
console.log(afterFn(1));
console.log(afterFn(1));
console.log(afterFn(1));
console.log(afterFn(1));
