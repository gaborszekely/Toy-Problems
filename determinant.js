m2 = [[2, 5, 3], [1, -2, -1], [1, 3, 4]];
m1 = [[1, 3], [2, 5]];

function determinant(m) {
  let final = 0,
    top = m[0];
  if (m.length === 1) {
    return top[0];
  }
  for (let i = 0; i < top.length; i++) {
    const el = top[i];
    const e_minor = m.reduce((acc, item, ind) => {
      acc = acc || [];
      if (ind) {
        let subRow = [...item.slice(0, i), ...item.slice(i + 1)];
        acc.push(subRow);
      }
      return acc;
    }, []);

    if (e_minor.length > 0) {
      let s =
        i % 2 === 0 ? el * determinant(e_minor) : -el * determinant(e_minor);
      final += s;
    }
  }
  return final;
}

Array.prototype.matrix = function(type, i) {
  if (i >= this.length || i < 0) {
    return this;
  }

  if (type.toUpperCase() === "R" || type.toUpperCase() === "ROW") {
    return this[i];
  }

  return this.reduce((acc, item) => {
    acc = acc || [];
    acc.push(item[i]);
    return acc;
  }, []);
};

const m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

m.matrix("C", 2); //?

let a = [];

for (let i = 0; i < 10000000; i++) {
  a.push(Math.ceil(Math.random() * 10));
}
//a.sort();

let b = [];

console.time("START");
let len = a.length;
for (let i = 0; i < len; i++) {
  if (b.includes(a[i])) {
    b.push(a[i]);
  }
}
//b = [...new Set(a)]

// for(let item of a) {
//   if(!b.includes(item)) {
//     b.push(item);
//   }
// }

// a.forEach(item => {
//   if(!b.includes(item)) b.push(item)
// })

// let temp;
// for(let i=0; i<len; i++){
//   if(temp !== a[i]) {
//     temp = a[i];
//     b.push(a[i]);
//   }
// }

//let obj = {};

// for(let i=0; i<len; i++) {
//   const item =a[i];
//   if(!obj[item]) {
//     obj[item] = true;
//     b.push(item);
//   }
// }

// for(let i of a) {
//   if(!obj[i]) {
//     obj[i] = true;
//     b.push(i);
//   }
// }

// for (let i of a) {
//   if (!obj[i]) {
//     obj[i] = true;
//   }
// }

//b = Object.keys(obj);
//for(let x in obj) { b.push(x)}

//b;
console.timeEnd("START");

// let ar = [];

// ar[0] = function() {
//   console.log(this.length);
// }

// ar[0](); //?

function y() {
  console.log(this.length);
}

let x = {
  length: 5,
  method(y) {
    y.call(this);
  }
};

x.method(y, 1, 2); //?
