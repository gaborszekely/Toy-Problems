/*
Write a function called "extend".

Given two objects, "extend" adds properties from the 2nd object to the 1st object.

Notes:
* Add any keys that are not in the 1st object.
* If the 1st object already has a given key, ignore it (do not overwrite the property value).
* Do not modify the 2nd object at all.

*/

const extend = (obj1, obj2) => {
  return Object.assign(obj2, obj1);
  //return {...obj2, ...obj1};
};

var obj1 = {
  a: 1,
  b: 2
};
var obj2 = {
  b: 4,
  c: 3
};

extend(obj1, obj2); //?

const obj3 = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5
};

const { a, ...rest } = obj3;

console.log(a);
console.log(rest);

const newObj = Object.create(
  {},
  {
    a: {
      value: 1,
      writeable: true,
      enumerable: true,
      configurable: true
    },
    b: {
      value: 2,
      writable: true,
      enumerable: true,
      configurable: true
    },
    c: {
      value: 3,
      writable: true,
      enumerable: false,
      configurable: false
    },
    theCount: {
      value: 3
      //enumerable: false,
      //configurable: false
    },
    count: {
      get() {
        return this.theCount;
      },
      set(value) {
        this.theCount = value;
        console.log(this.theCount);
      }
    }
  }
);

newObj.toString();

obj3.toString();

for (let key of Object.keys(newObj)) {
  console.log(key);
}

newObj.c = 7;
newObj.c; //?

newObj.count = 2;
newObj.count; //?

var o = {
  a: 7,
  get b() {
    return this.a + 1;
  },
  set b(x) {
    this.a = x / 2;
  }
};

console.log(o.a); // 7
console.log(o.b); // 8
o.b = 50;
console.log(o.b);
console.log(o.a); // 25
