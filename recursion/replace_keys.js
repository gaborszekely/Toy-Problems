// 24. Find all keys in an object (and nested objects) by a provided name and rename them to a provided new name while preserving the value stored at that key.
var replaceKeysInObj = function(obj, oldKey, newKey) {
  for (let x in obj) {
    if (x === oldKey) {
      if (typeof obj[x] !== "object") {
        obj[newKey] = obj[x];
      } else {
        obj[newKey] = replaceKeysInObj(obj[x], oldKey, newKey);
      }
      delete obj[x];
    } else {
      if (typeof obj[x] === "object") {
        obj[x] = replaceKeysInObj(obj[x], oldKey, newKey);
      }
    }
  }
  return obj;
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

console.log(replaceKeysInObj(obj, "e", "poop"));
console.log(replaceKeysInObj(obj, "y", "asshole"));
