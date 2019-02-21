var parseJSON = function (json) {

  var index = 0;
  var character = ' ';


  var nextCh = ch => {
    if (ch && ch !== character) {
      throw new SyntaxError("Expected '" + ch + "' instead of '" + character + "'");
    }
    character = json[index];
    index++;
    return character;
  };

  var whiteSpace = () => {
    while (character && character <= ' ') {
      nextCh();
    }
  };

  var parseString = () => {
    const exceptions = {
      "\\b": "\\b";
      "\\n": "\\n";
      "\\f": "\\f";
      "\\r": "\\r";
      '"': '"';
      "\\": "\\";
    };

    var string = "";

    if (character === '"') {
      while (nextCh()) {
        if (character === '"') {

          // Check for backslash ?
          nextCh('"');
          return string;
        }
      }
    }

    // Check for the other stuff
  }

  var parseObject = () => {
    result = {};
  }

  var parseArray = () => {
    result = [];
  }

  const initiateParser = () => {
    switch (character) {
      case "{":
        parseObject();
      case "[":
        parseArray();
      case '"':
        parseString();
    }
  }

  while (index < json.length) {
    initiateParser();
  }
};