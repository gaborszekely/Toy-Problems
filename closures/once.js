const once = fn => {
  let ran = false;
  let val;

  return function(...args) {
    if (!ran) {
      ran = true;
      return (val = fn(...args));
    }

    return val;
  };
};

const fn = x => x + 1;

const fnOnce = once(fn);

console.log(fnOnce(3));
console.log(fnOnce(3));
