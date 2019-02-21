// 23. Write a function that counts the number of times a value occurs in an object.
// var obj = {'e':{'x':'y'},'t':{'r':{'e':'r'},'p':{'y':'r'}},'y':'e'};
// countValuesInObj(obj, 'r') // 2
// countValuesInObj(obj, 'e') // 1

var countValuesInObj = function(obj, value) {
  let count = 0;
  const newObj = JSON.parse(JSON.stringify(obj));

  if (Object.entries(newObj).length === 0) {
    return count;
  }

  for (let x in newObj) {
    if (newObj[x] === value) {
      count++;
    }
    if (typeof newObj[x] === "object") {
      count += countValuesInObj(newObj[x], value);
    }

    delete newObj[x];
  }

  return count + countValuesInObj(newObj, value);
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

console.log(countValuesInObj(obj, "e"));
console.log(countValuesInObj(obj, "r"));
