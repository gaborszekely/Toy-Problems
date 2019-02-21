const addTo = y => x => y + x;
const half = x => x / 2;
const min3 = x => x - 3;

const pipe = (...fns) => x => fns.reduce((acc, fn) => (acc = fn(acc)), x);

const doStuff = pipe(
  half,
  min3,
  addTo(4)
);

console.log(doStuff(46)); //?
