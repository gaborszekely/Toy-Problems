var parseJSON = function(json) {
  initialCheck(json);
  checkValidJSON(json);

  let result = checkMainType(json),
    currentChar = json[0],
    currentIndex = 0,
    remainingJson,
    currentItem = null,
    newI = 0;

  if (typeof result === "string") {
    return result;
  }

  const escapeChars = {
    "\\b": "\\b",
    "\\n": "\\n",
    "\\f": "\\f",
    "\\r": "\\r"
  };

  const parseObject = () => {
    result = {};
    let objectIndex = 0,
      currentKey = "",
      currentVal = "",
      onKey = false,
      onVal = false;

    newI = findObj(json.substring(currentIndex), "object");

    if (!newI) {
      throw new SyntaxError("Invalid JSON");
    }

    currentItem = json.substring(currentIndex, newI + 1);
    currentIndex += newI;

    if (currentItem === "{}") {
      return {};
    } else {
      for (let i = 1; i < currentItem.length - 1; i++) {
        if (i === 1 && currentItem[i] !== '"') {
          throw new SyntaxError("Invalid JSON");
        }

        i;
      }
    }
  };

  const parseArray = () => {
    currentItem = findObj(remainingJson, "array");
  };

  const parseString = () => {
    currentItem = findString(remainingJson);
  };

  const initiateParse = () => {
    switch (currentChar) {
      case "{":
        parseObject();
      case "[":
        parseArray();
      case '"':
        parseString();
      case "-":
      //
      case ":":
      case "\\":
      case " ":
      default:
        let x = y;
    }
  };

  while (currentIndex <= json.length - 1) {
    initiateParse();
  }

  return result;
};

/*
  Backspace is replaced with \b.
  Form feed is replaced with \f.
  Newline is replaced with \n.
  Carriage return is replaced with \r.
  Tab is replaced with \t.
  Double quote is replaced with \"
  Backslash is replaced with \\
*/

/* Rules of JSON:
  - Keys surrounded in qoutes
  - 
*/

// while (nextChar(ch)) {}

function initialCheck(json) {
  let res = null;
  if (typeof json !== "string") {
    if (
      typeof json === "boolean" ||
      typeof json === "number" ||
      typeof json === "null"
    ) {
      res = json;
    } else if (Array.isArray(json) || typeof json === "undefined") {
      throw new SyntaxError("Invalid parse element");
    }
  }

  return res;
}

function checkValidJson(json) {
  const countChars = (str, char) => {
    const specialChars = /[\[\{\]\}]/;
    const regex = specialChars.test(char)
      ? new RegExp("\\" + char)
      : new RegExp(char);
    const found = str.match(regex);
    return found ? found.length : 0;
  };

  const countQuotes = str => {
    const regex = /\w*(?<!\\)"/g;
    const found = str.match(regex);
    return found ? found.length : 0;
  };

  const totalCurly = countChars(json, "{") + countChars(json, "}");
  const totalBrackets = countChars(json, "[") + countChars(json, "]");

  if (
    totalCurly % 2 !== 0 ||
    totalBrackets % 2 !== 0 ||
    countQuotes(json) % 2 !== 0
  ) {
    throw new SyntaxError("Invalid JSON");
  }
}

const findObj = (str, type) => {
  let o, c;

  switch (type) {
    case "object":
      o = "{";
      c = "}";
      break;
    case "array":
      o = "[";
      c = "]";
  }

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

const findString = str => {
  for (let i = 1; i < str.length; i++) {
    if (str[i] === '"') {
      if (str[i - 1] !== "\\") {
        return i;
      }
    }
  }

  return null;
};

const str = '"Hello boys" and "Girls"';
const str2 = '"Hello\\" Girls"';
console.log(str2);
console.log(str.substring(0, findString(str) + 1));
console.log(str2.substring(0, findString(str2) + 1));

// var string = '"hello"';
// var index = 0;
// var character = " ";
// let final = "";
// let start;
// let end;

// var nextCh = ch => {
//   if (ch && ch !== character) {
//     throw new SyntaxError(
//       "Expected '" + ch + "' instead of '" + character + "'"
//     );
//   }
//   character = string[index];
//   index++;
//   return character;
// };

// while (nextCh()) {
//   if (character === '"') {
//     if(string[index] === '"') {
//       return string
//     }
//     // if (
//     //   !string[index - 2] ||
//     //   (string[index - 2] && string[index - 2] !== "\\")
//     // ) {
//     //   if (typeof start === "undefined") {
//     //     start = index;
//     //   } else {
//     //     end = index;
//     //   }
//     // }
//   }
// }

// character = json.charAt(index);
// index++;
// return character;

function checkMainType(str) {
  let chars = [str[0], str[str.length - 1]];

  if (chars[0] === "{" && chars[1] === "}") {
    return {};
  } else if (chars[0] === "[" && chars[1] === "]") {
    return [];
  } else if (chars[0] === '"' && chars[1] === '"') {
    return str;
  }

  return null;
}
