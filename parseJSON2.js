const findObj = (str, o, c) => {
  let oCount = 0,
    cCount = 0,
    oIndex,
    oFound = false;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === o) {
      console.log(i);
      if (!oFound) {
        oFound = true;
        oIndex = i;
        console.log(i);
      }
      oCount++;
    } else if (str[i] === c) {
      cCount++;
    }

    if (oCount === cCount && oCount !== 0) {
      return [oIndex, i];
    }
  }

  return null;
};

const parser = str => {
  const first = str[0],
    last = str[str.length - 1];

  if (first === "{") {
    let [startI, endI] = findObj(str, "{", "}");
    let obj = str.slice();
  } else if (first === "[") {
    let endI = findObj(str, "[", "]");
  }
};

let str = `{'a': 'b', 'c': 'd', 'e': {'a': 'b', 'c': [1, 2, 3]}}, {'a': 'b', 'c': 'd'}`;

parser(str);

// let str2 = `{'a': 'b', 'c': 'd', 'e': {'a': 'b', 'c': [1, 2, 3, [12]]}}, {'a': 'b', 'c': 'd'}`;

const [s, e] = findObj(str, "{", "}");
console.log(str.slice(s, e + 1));

/*

ALGORITHM FOR OBJECTS:

  - first, go until you hit a colon (that is the key)
  - if the thing after that is an opening brace(regular or curly), then:
    - Start a running tally of braces
    - As soon as opening and closing ones match, you know you reached the end of that object,
    - Call parseJSON function on that object recusrively and add to result
  - Otherwise, go until you hit a comma (that is the end of key/value pair) and push key/value pair to result
  - Repeat until you reach end
*/
