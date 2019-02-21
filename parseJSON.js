/* Works for:
  - Arrays / nested arrays
*/

var parseJSON = function(json) {
  if (typeof json !== "string") {
    if (
      typeof json === "boolean" ||
      typeof json === "number" ||
      typeof json === "null"
    ) {
      return json;
    } else if (Array.isArray(json) || typeof json === "undefined") {
      throw new SyntaxError("Invalid parse element");
    }
  }

  var countChars = (str, char) => {
    var specialChars = /[\[\{\]\}]/;
    var regex = specialChars.test(char)
      ? new RegExp("\\" + char)
      : new RegExp(char);
    var found = str.match(regex);
    return found ? found.length : 0;
  };

  var countQuotes = str => {
    var regex = /\w*(?<!\\)"/g;
    var found = str.match(regex);
    return found ? found.length : 0;
  };

  var fixPrims = str => {
    // return str;
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
      val = parseInt(str);
      found = true;
    }

    return found ? val : str;
  };

  var totalCurly = countChars(json, "{") + countChars(json, "}");
  var totalBrackets = countChars(json, "[") + countChars(json, "]");

  if (
    totalCurly % 2 !== 0 ||
    totalBrackets % 2 !== 0 ||
    countQuotes(json) % 2 !== 0
  ) {
    throw new SyntaxError("Invalid JSON");
  }

  // DO THE REST

  var chars = json.split(""),
    first = chars[0],
    last = chars[chars.length - 1],
    insideObj = json.substring(1, json.length - 1),
    isObj = str => str[0] === "{" && str[str.length - 1] === "}",
    isAry = str => str[0] === "[" && str[str.length - 1] === "]",
    checkQuotes = str => str[0] === '"' && str[str.length - 1] === '"',
    trimQuotes = item => item.substring(1, item.length - 1),
    regex,
    splits,
    result;

  // Check for regular string
  if (first !== "[" && first !== "{" && last !== "]" && last !== "}") {
    throw new SyntaxError("Invalid JSON");
  }

  // ARRAY
  if (isAry(json)) {
    result = [];
    regex = /([\w'"\-.]+)|(\{.+\})|(['"]*\w+['"] *: \s *\[.+\])| (\[.*\])/g;
    splits = insideObj.match(regex);
    if (!splits) return [];

    splits.forEach(item => {
      // item = trimQuotes(item);
      if (!isAry(item) && !isObj(item)) {
        item = !checkQuotes(item) ? fixPrims(item) : trimQuotes(item);
        result.push(item);
      } else {
        result.push(parseJSON(item));
      }
    });
  }

  // console.log(splits);

  // OBJECT
  if (isObj(json)) {
    result = {};
    regex = /(['"]*[\w\s\,]+['"]*:\s*\{.*\})|(['"]*[\w\s\,]+['"]*:\s*\[.+\])|(['"]*[\w\s\,]+['"]*:\s*[\w'"]+)/g;
    splits = insideObj.match(regex);
    if (!splits) return {};
    let keyValPairs = [];

    splits.forEach(pair => {
      var colonI = pair.indexOf(":");
      var key = pair.substring(0, colonI);
      var val =
        pair[colonI + 1] === " "
          ? pair.substring(colonI + 2)
          : pair.substring(colonI + 1);

      keyValPairs.push([key, val]);
    });

    keyValPairs = keyValPairs.map(kv => kv.map(i => i.replace(/\"/g, "")));
    keyValPairs.forEach(pair => {
      let [key, val] = pair;
      if (!isObj(val) && !isAry(val)) {
        val = !checkQuotes(val) ? fixPrims(val) : trimQuotes(val);
        result[key] = val;
      } else {
        result[key] = parseJSON(val);
      }
    });
  }

  return result;
};

parseableStrings = [
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

// parseableStrings.forEach(str => console.log(parseJSON(str)));

// console.log(parseableStrings[8])

// var ary2 = [1, 2, [3, 4, [5]]];

var ary = `[[[[["foo"]]]]]`;
// console.log(parseJSON(ary));

// console.log(parseJSON(parseableStrings[8]));
// console.log(ary2);

console.log(parseJSON(parseableStrings[16]));
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
  "      }\r\n";
/*
  IF OBJECT:
    - Remove brackets
    - First, go until colon (first key)
    - Next, check type of 

*/
