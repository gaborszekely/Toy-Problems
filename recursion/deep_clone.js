// 40. Deeply clone objects and arrays.
// var obj1 = {a:1,b:{bb:{bbb:2}},c:3};
// var obj2 = clone(obj1);
// console.log(obj2); // {a:1,b:{bb:{bbb:2}},c:3}
// obj1 === obj2 // false
var clone = function(input) {
  let obj = Array.isArray(input) ? [] : {};
  for (let key in input) {
    const val = input[key];
    if (typeof val !== "object") {
      obj = Array.isArray(obj) ? [...obj, val] : { ...obj, [key]: val };
    } else {
      obj = Array.isArray(obj)
        ? [...obj, clone(val)]
        : { ...obj, [key]: clone(val) };
      // if(Array.isArray(val)) {
      //   obj
      // }
    }
  }

  return obj;
};

const obj = {
  a: 1,
  b: {
    c: {
      d: 3,
      e: 4
    },
    f: 5
  },
  g: 6
};

console.log(obj === clone(obj));
console.log(clone(obj));


const ary = [1, [2, [3, 4], 5], 6, [7, [8, [9]]]];
console.log(clone(ary));
