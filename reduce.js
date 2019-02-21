let users = [
  { id: 11, name: "Adam", age: 23, group: "editor" },
  { id: 47, name: "John", age: 28, group: "admin" },
  { id: 85, name: "William", age: 34, group: "editor" },
  { id: 97, name: "Oliver", age: 28, group: "admin" }
];

// let x = users.reduce((acc, item) => {
//   const { group, ...rest } = item;
//   acc[group] = group in acc ? [...acc[group], rest] : [rest];

//   return acc;
// }, {});

const x = users.reduce(
  (acc, item) => ({
    ...acc,
    [item.group]: !acc[item.group] ? [item] : [...acc[item.group], item]
  }),
  {}
);

// console.log(x);

// let y = users.reduce((acc, item) => {
//   if (!acc.includes(item.id)) {
//     acc.push(item.id);
//   }
//   return acc;
// }, []);

const y = users.reduce((acc, item) => [...acc, item.id], []);

// console.log(y);

// let z = users.reduce((acc, item) => {
//   const { id } = item;
//   if (typeof acc[id] === "undefined") {
//     acc[id] = item;
//   }
//   return acc;
// }, {});

const z = users.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});

// console.log(z);

const groups = [...new Set(users.map(user => user.group))];
console.log(groups);

const cities = {
  Lyon: "France",
  Barcelona: "Spain",
  Munich: "Germany"
};

// Object.fromEntries = function(entries) {
//   const newObj = {};
//   for (let entry of entries) {
//     newObj[entry[0]] = entry[1];
//   }
//   return newObj;
// };

//Object.fromEntries = arr => Object.assign({}, ...Array.from(arr, ([k, v]) => ({ [k]: v })));

Object.fromEntries = arr => Object.assign({}, ...arr.map(item => ({[item[0]]: item[1]})));

const countries = Object.fromEntries(
  Object.entries(cities).map(entry => entry.reverse())
);

console.log(countries);
