var splitByChar = (byChar, check = true, full = false) => str => {
  let bracketCount = 0,
    curlyCount = 0,
    dqCount = 0,
    sqCount = 0,
    curlyOpen = false,
    bracketOpen = false,
    dqOpen = false,
    sqOpen = false,
    result = [],
    lastSplitIndex = 1,
    startI = 1,
    endI = str.length - 2;

  if (full) {
    startI = 0;
    endI = str.length - 1;
    lastSplitIndex = 0;
  }

  for (let i = startI; i <= endI; i++) {
    let curr = str[i],
      prev = str[i - 1];

    // Opening object or array brackets
    if (curr === "{" || curr === "[") {
      if (curr === "{") {
        curlyOpen = true;
        curlyCount++;
      } else if (curr === "[") {
        bracketOpen = true;
        bracketCount++;
      }
    }

    // Closing object or array brackets
    if (curr === "}" || curr === "]") {
      if (curr === "}") {
        curlyCount--;
      } else if (curr === "]") {
        bracketCount--;
      }

      if (check) {
        if (curlyCount < 0 || bracketCount < 0) {
          throw new SyntaxError("Invalid JSON");
        }
      }

      if (curlyCount === 0) {
        curlyOpen = false;
      }

      if (bracketCount === 0) {
        bracketOpen = false;
      }
    }

    // Quotation marks
    if (curr === '"' || curr === "'") {
      if (prev !== "\\") {
        if (curr === '"') {
          dqOpen = true;
          dqCount++;
        } else if (curr === "'") {
          sqOpen = true;
          sqCount++;
        }
      }
    }

    if (dqCount % 2 === 0) {
      dqOpen = false;
    }

    if (sqCount % 2 === 0) {
      sqOpen = false;
    }

    if (curr === byChar && !sqOpen && !dqOpen && !curlyOpen && !bracketOpen) {
      let obj = str.substring(lastSplitIndex, i).trim();
      result.push(obj);
      lastSplitIndex = i + 1;
    }

    if (i === endI) {
      if (!dqOpen && !sqOpen && !curlyOpen && !bracketOpen) {
        let obj = str.substring(lastSplitIndex, endI + 1).trim();
        result.push(obj);
      } else {
        if (check) {
          throw new SyntaxError("Invalid JSON!");
        }
      }
    }
  }

  return result;
};

var splitByCommas = splitByChar(","),
  splitByColon = splitByChar(":", false, true);

var removeOutside = str => {
  let ch = [str[0], str[str.length - 1]];
  if ((ch[0] === "[" && ch[1] === "]") || (ch[0] === "{" && ch[1] === "}")) {
    return str.substring(1, str.length - 1);
  }

  return str;
};

function isNested(str) {
  let bracketCount = 0,
    oBracketCount = 0,
    cBracketCount = 0,
    curlyCount = 0,
    oCurlyCount = 0,
    cCurlyCount = 0,
    dqCount = 0,
    sqCount = 0,
    curlyOpen = false,
    bracketOpen = false,
    dqOpen = false,
    sqOpen = false,
    totalCurly = 0,
    totalBracket = 0;

  for (let i = 0; i < str.length; i++) {
    let curr = str[i],
      prev = str[i - 1];

    // Opening object or array brackets
    if (curr === "{" || curr === "[") {
      if (!dqOpen && !sqOpen) {
        if (curr === "{") {
          oCurlyCount++;
          curlyCount++;
          curlyOpen = true;
        } else if (curr === "[") {
          oBracketCount++;
          bracketCount++;
          bracketOpen = true;
        }
      }
    }

    // Closing object or array brackets
    if (curr === "}" || curr === "]") {
      if (!dqOpen && !sqOpen) {
        if (curr === "}") {
          cCurlyCount++;
          curlyCount--;
        } else if (curr === "]") {
          cBracketCount++;
          bracketCount--;
        }

        if (curlyCount < 0 || bracketCount < 0) {
          throw new SyntaxError("Invalid JSON");
        }

        if (curlyCount === 0) {
          curlyOpen = false;
        }

        if (bracketCount === 0) {
          bracketOpen = false;
        }
      }
    }

    // Quotation marks
    if (curr === '"' || curr === "'") {
      if (prev !== "\\") {
        if (curr === '"') {
          dqCount++;
          dqOpen = true;
        } else if (curr === "'") {
          sqCount++;
          sqOpen = true;
        }
      }
    }

    if (dqCount % 2 === 0) {
      dqOpen = false;
    }

    if (sqCount % 2 === 0) {
      sqOpen = false;
    }
  }

  if (dqOpen || sqOpen || bracketOpen || curlyOpen) {
    throw new SyntaxError("Invalid JSON");
  }

  return cBracketCount + cCurlyCount > 1;
}

var obj =
  '[{"a": "b", "c": {"d": "e", "f": [3, 4, 5]}}, {f: "g", h: ["i", "j", "k"]}, [1, 2, 3]]';

var kvPairs = splitByCommas(obj);
// console.log(kvPairs);
var commaSplit = kvPairs.map(i => splitByCommas(i));
// console.log(kvPairs.map(pair => splitByColon(pair)));

var kvPairsArr = [
  '{"a": "b", "c": {"d": "e", "f": [1, 2, 3]}}',
  '{f: "g", h: ["i", "j", "k"]}',
  "[1, 2, 3]"
];

var ex = '{f: "g", h: "[\\"i\\", \\"j\\", \\"k\\"]"}';

// console.log(isNested(ex));

// var parseJSON = json => {
//   let index = 0,
//     result;

//   if (isObj(json)) {
//     result = {};
//     parseObj();
//     // Split by k/v pairs
//     // Check for nested object
//     // call recursively von nested objects
//     // Re-construct as object
//   }

//   if (isAry()) {
//     result = [];

//     // Split by elements
//     // Check for nested object
//     // call recursively von nested objects
//     // Re-construct as array
//     parseAry();
//   }

//   if (isString()) {
//     result = "";
//   }

//   if (other()) {
//     //
//   }
// };

function parseObj(obj) {
  let result = {},
    kvPairs = splitByCommas(obj);

  kvPairs.forEach(pair => {
    let [key, val] = splitByColon(pair);
    if (!isString(key)) {
      throw new SyntaxError("Invalid JSON");
    }

    key = parseString(key);

    if (isString(val)) {
      val = parseString(val);
    } else if (isObject(val)) {
      val = parseObj(val);
    } else if (isArray(val)) {
      val = parseArray(val);
    } else {
      val = fixPrims(val);
    }

    result[key] = val;
  });

  return result;
}

function parseArray(ary) {
  let result = [];
  let elems = splitByCommas(ary);
  elems.forEach(el => {
    if (isString(el)) {
      el = parseString(el);
    } else if (isObject(el)) {
      el = parseObj(el);
    } else if (isArray(el)) {
      el = parseArray(el);
    } else {
      el = fixPrims(el);
    }

    result.push(el);
  });

  return result;
}

function parseString(str) {
  const exceptions = {
    "\\b": "\b",
    "\\n": "\n",
    "\\f": "\f",
    "\\r": "\r"
  };
  let insideStr = str.slice(1, str.length - 1);
  for (let i = 0; i < insideStr.length; i++) {
    let current = insideStr[i];
    let prev = insideStr[i - 1];

    if (current === '"' && prev !== "\\") {
      throw new SyntaxError("Invalid JSON");
    }
  }

  // CHECK FOR SPECIAL CHARACTERS
  for (let key in exceptions) {
    insideStr.replace(key, exceptions[key]);
  }
  return insideStr;
}

function isString(i) {
  return i[0] === '"' && i[i.length - 1] === '"';
}

function isObject(i) {
  return i[0] === "{" && i[i.length - 1] === "}";
}

function isArray(i) {
  return i[0] === "[" && i[i.length - 1] === "]";
}

function fixPrims(str) {
  let val,
    found = false;
  if (str === "null") {
    val = null;
    found = true;
  } else if (str === "undefined") {
    val = undefined;
    found = true;
  } else if (str === "true") {
    val = true;
    found = true;
  } else if (str === "false") {
    val = false;
    found = true;
  } else if (!isNaN(parseInt(str))) {
    val = Number(str);
    found = true;
  }

  return found ? val : str;
}

var parseableStrings = [
  // basic stuff
  "[]",
  '{"foo": ""}',
  "{}",
  '{"foo": "bar"}',
  '["one", "two"]',
  '{"a": "b", "c": "d"}',
  "[null,false,true]",
  '{"foo": true, "bar": false, "baz": null}',
  "[1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]",
  '{"boolean, true": true, "boolean, false": false, "null": null }',

  // basic nesting
  '{"a":{"b":"c"}}',
  '{"a":["b", "c"]}',
  '[{"a":"b"}, {"c":"d"}]',
  '{"a":[],"c": {}, "b": true}',
  '[[[["foo"]]]]',

  // escaping
  '["\\\\\\"\\"a\\""]',

  '["and you can\'t escape this"]',

  // everything all at once
  '{"CoreletAPIVersion":2,"CoreletType":"standalone",' +
    '"documentation":"A corelet that provides the capability to upload' +
    ' a folderâ€™s contents into a userâ€™s locker.","functions":[' +
    '{"documentation":"Displays a dialog box that allows user to ' +
    'select a folder on the local system.","name":' +
    '"ShowBrowseDialog","parameters":[{"documentation":"The ' +
    'callback function for results.","name":"callback","required":' +
    'true,"type":"callback"}]},{"documentation":"Uploads all mp3 files' +
    ' in the folder provided.","name":"UploadFolder","parameters":' +
    '[{"documentation":"The path to upload mp3 files from."' +
    ',"name":"path","required":true,"type":"string"},{"documentation":' +
    ' "The callback function for progress.","name":"callback",' +
    '"required":true,"type":"callback"}]},{"documentation":"Returns' +
    ' the server name to the current locker service.",' +
    '"name":"GetLockerService","parameters":[]},{"documentation":' +
    '"Changes the name of the locker service.","name":"SetLockerSer' +
    'vice","parameters":[{"documentation":"The value of the locker' +
    ' service to set active.","name":"LockerService","required":true' +
    ',"type":"string"}]},{"documentation":"Downloads locker files to' +
    ' the suggested folder.","name":"DownloadFile","parameters":[{"' +
    'documentation":"The origin path of the locker file.",' +
    '"name":"path","required":true,"type":"string"},{"documentation"' +
    ':"The Window destination path of the locker file.",' +
    '"name":"destination","required":true,"type":"integer"},{"docum' +
    'entation":"The callback function for progress.","name":' +
    '"callback","required":true,"type":"callback"}]}],' +
    '"name":"LockerUploader","version":{"major":0,' +
    '"micro":1,"minor":0},"versionString":"0.0.1"}',

  '{ "firstName": "John", "lastName" : "Smith", "age" : ' +
    '25, "address" : { "streetAddress": "21 2nd Street", ' +
    '"city" : "New York", "state" : "NY", "postalCode" : ' +
    ' "10021" }, "phoneNumber": [ { "type" : "home", ' +
    '"number": "212 555-1234" }, { "type" : "fax", ' +
    '"number": "646 555-4567" } ] }',

  "{\r\n" +
    '          "glossary": {\n' +
    '              "title": "example glossary",\n\r' +
    '      \t\t"GlossDiv": {\r\n' +
    '                  "title": "S",\r\n' +
    '      \t\t\t"GlossList": {\r\n' +
    '                      "GlossEntry": {\r\n' +
    '                          "ID": "SGML",\r\n' +
    '      \t\t\t\t\t"SortAs": "SGML",\r\n' +
    '      \t\t\t\t\t"GlossTerm": "Standard Generalized ' +
    'Markup Language",\r\n' +
    '      \t\t\t\t\t"Acronym": "SGML",\r\n' +
    '      \t\t\t\t\t"Abbrev": "ISO 8879:1986",\r\n' +
    '      \t\t\t\t\t"GlossDef": {\r\n' +
    '                              "para": "A meta-markup language,' +
    ' used to create markup languages such as DocBook.",\r\n' +
    '      \t\t\t\t\t\t"GlossSeeAlso": ["GML", "XML"]\r\n' +
    "                          },\r\n" +
    '      \t\t\t\t\t"GlossSee": "markup"\r\n' +
    "                      }\r\n" +
    "                  }\r\n" +
    "              }\r\n" +
    "          }\r\n" +
    "      }\r\n"
];

// JSON does not allow you to parse these strings
var unparseableStrings = ['["foo", "bar"', '["foo", "bar\\"]'];

// Rounding numbers?
// console.log(parseArray(parseableStrings[8]));

// console.log(parseObj(parseableStrings[19]));

var parseJSON = json => {
  const f = json[0];

  if (f === '"') {
    return parseString(json);
  } else if (f === "{") {
    return parseObj(json);
  } else if (f === "[") {
    return parseArray(json);
  } else {
    return fixPrims(json);
  }
};

console.log(parseJSON(parseableStrings[8]));

// console.log(parseJSON(unparseableStrings[0]));
