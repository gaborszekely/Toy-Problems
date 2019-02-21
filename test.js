//const axios = require("axios");
// const uuid = require("uuid");

// uuid()

// const reverseStr = str => [...str].reverse().join("");

// console.log(reverseStr("abcde"));

// class Person {
//   constructor(person) {
//     this.first = person.first;
//     this.last = person.last;
//     this.gender = person.gender;
//     this.age = person.age;
//     this.isMarried = person.isMarried;

//     Person.count++;
//     console.log(Person.count);
//   }

//   static async fetchFiles() {
//     try {
//       const post = await axios.get(
//         "https://jsonplaceholder.typicode.com/posts/1"
//       );
//       console.log(post.data.title);
//     } catch (e) {
//       console.log("Unable to fetch!");
//     }
//   }

//   returnFullName() {
//     return `${this.first} ${this.last}`;
//   }
// }

// Person.count = 0;

// const Ben = new Person({
//   first: "Ben",
//   last: "Blaze",
//   gender: "male",
//   age: 32,
//   isMarried: false
// });

// console.log(Ben.returnFullName());

// console.log(Ben.first);

// Person.fetchFiles();

// const Katie = new Person({
//   first: "Katie",
//   last: "Laudner",
//   gender: "female",
//   age: 24,
//   isMarried: false
// });

// const Joe = new Person({
//   first: "Joe",
//   last: "Kinder",
//   gender: "male",
//   age: 39,
//   isMarried: true
// });

// console.log(Person.count);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// let obj3 = {
//   a: 1,
//   b: 2
// };

// function Base(a, b) {
//   this.a = a;
//   this.b = b;
// }

// Base.prototype.tester = function() {
//   return "Base prototype method";
// };

// class SubClass extends Base {
//   constructor(a, b, c) {
//     super(a, b);
//     this.c = c;
//   }
// }

// let newsc = new SubClass(1, 2, 3);

// console.log(newsc.tester());

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// let array = ["first", "second", "third"];
// let arrayRef = array;
// //let arrayRef = [...array];
// arrayRef[2] = 3;

// console.log(array[2]);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const xobj = {
//   name: "Ben",
//   age: 12,
//   greet: function() {
//     return `Hello, ${this.name}!`;
//   }
// };

// const xobj2 = { ...xobj, name: "Joe", age: 22 };

// xobj.greet = function() {
//   return `Welcome, ${this.name}!`;
// };

// console.log(xobj.greet());
// console.log(xobj2.greet());

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ORIGINAL INHERTIENCE */
// function Uno(name) {
//   this.name = name;
// }

// Uno.prototype.greet = function() {
//   return `Welcome, ${this.name}!`;
// };

// function Dos(name, type) {
//   Uno.call(this, name);
//   this.type = type;
// }

// Dos.prototype = new Uno();

// const minidos = new Dos("Hector", "human");

// console.log(minidos.greet());

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const identity = "Bruce Wayne";

// function secretIdentity() {
//   const identity = "Batman";

//   return function getSecretIdentity() {
//     return identity;
//   };
// }

// var getIdentity = secretIdentity();

// console.log(getIdentity());

// global.name = "Bruce Wayne";

// const hero = {
//   name: "Batman",
//   getIdentity() {
//     return this.name;
//   }
// };

// console.log(hero.getIdentity());

// const getIdentity = hero.getIdentity;

// console.log(getIdentity());

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const hero = {
//   _name: "John Doe",
//   getSecretIdentity: function() {
//     return this._name;
//   }
// };

// const stoleSecretIdentity = hero.getSecretIdentity; //

// const newID = stoleSecretIdentity.bind(hero);

// newID() //?
// stoleSecretIdentity();
// hero.getSecretIdentity();

// const products = [
//   {
//     name: "Sonoma",
//     ingredients: ["artichoke", "sundried tomatoes", "mushrooms"],
//     containsNuts: false
//   },
//   {
//     name: "Pizza Primavera",
//     ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"],
//     containsNuts: false
//   },
//   {
//     name: "South Of The Border",
//     ingredients: ["black beans", "jalapenos", "mushrooms"],
//     containsNuts: false
//   },
//   {
//     name: "Blue Moon",
//     ingredients: ["blue cheese", "garlic", "walnuts"],
//     containsNuts: true
//   },
//   {
//     name: "Taste Of Athens",
//     ingredients: ["spinach", "kalamata olives", "sesame seeds"],
//     containsNuts: true
//   }
// ];

// const filtered = products
//   .map(product => product.ingredients)
//   .reduce((acc, item) => [...acc, ...item], [])
//   .reduce((acc, item) => {
//     acc = acc || {};
//     item in acc ? acc[item]++ : (acc[item] = 1);
//     return acc;
//   }, {});

/////////////////////////////////////////////////////////////////////////

// class Person {
//   constructor(first, last, age, married) {
//     this.first = first;
//     this.last = last;
//     this.age = age;
//     this.married = married;
//   }

//   get fullName() {
//     return `${this.first} ${this.last}`;
//   }

//   set fullName(name) {
//     var split = name.split(" ");
//     this.first = split[0];
//     this.last = split[1];
//   }
// }

// let gabe = new Person("Gabor", "Szekely", 28, false);

// gabe.fullName = "Baby Boo";

// gabe.fullName

/////////////////////////////////////////////////////////////////////////////////

// let users = [
//   {
//     id: 1,
//     name: {
//       first: "Ben",
//       last: "Boo"
//     },
//     isAdmin: false,
//     createdAt: 3,
//     updatedAt: 4
//   },
//   {
//     id: 2,
//     name: {
//       first: "Martha",
//       last: "Kellerman"
//     },
//     isAdmin: false,
//     createdAt: 2,
//     updatedAt: 5
//   },
//   {
//     id: 3,
//     name: {
//       first: "Joe",
//       last: "Pooper"
//     },
//     isAdmin: true,
//     createdAt: 3,
//     updatedAt: 3
//   }
// ];

// const updated = {
//   id: 3,
//   updatedAt: 12
// };

// const updatedUsers = users.map(user =>
//   user.id === updated.id ? { ...user, ...updated } : user
// );

// const filteredUsers = users.filter(user => user.id !== updated.id);

// console.log([...users]);

///////////////////////////////////////////////////////////////////////////////////////

let arr = [2, 4, 1, 9, 55, 12, 23, 34, 2, 1, 3, 4, 4, 9, 5];
let arr2 = ["11", "3", "6", "1", "11", "34", "29", "2"];

// Sorting numbers
arr.sort((a, b) => a - b); //?

// Sorting Strings
arr2.sort((a, b) => a > b); //?

////////////////////////////////////////////////////////////////////////////////////////////

let obj1 = {
  a: 1,
  b: 2,
  c: 3
};

let obj2 = {
  c: 4,
  d: 5
};

obj2 = Object.assign(obj2, obj1); //?

let obj3 = Object.create(
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
      writeable: false,
      enumerable: false,
      configurable: false
    }
  }
); //?

for (let key in obj3) {
  console.log(key);
}

obj3.b = "NEW VALUE";
obj3.b; //?

obj3.toString(); //?
