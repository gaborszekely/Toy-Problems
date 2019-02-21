// 22. Write a function that counts the number of times a key occurs in an object.
// var obj = {'e':{'x':'y'},'t':{'r':{'e':'r'},'p':{'y':'r'}},'y':'e'};
// countKeysInObj(obj, 'r') // 1
// countKeysInObj(obj, 'e') // 2
var countKeysInObj = function(obj, key) {
  let count = 0;
  const newObj = JSON.parse(JSON.stringify(obj));

  if (Object.entries(newObj).length === 0) {
    return count;
  }

  for (let x in newObj) {
    if (x === key) {
      count++;
    }
    if (typeof newObj[x] === "object") {
      count += countKeysInObj(newObj[x], key);
    }

    delete newObj[x];
  }

  return count + countKeysInObj(newObj, key);
};

const obj = {
  e: {
    x: "y"
  },
  t: {
    r: {
      e: "r"
    },
    p: {
      y: "r"
    }
  },
  y: "e"
};

console.log(countKeysInObj(obj, "e"));
console.log(countKeysInObj(obj, "x"));
console.log(countKeysInObj(obj, "y"));
console.log(countKeysInObj(obj, "t"));
console.log(countKeysInObj(obj, "r"));
console.log(countKeysInObj(obj, "p"));
