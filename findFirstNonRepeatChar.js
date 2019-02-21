const findFirstNonRepeatChar = str => {
  //const regex = /[\w]/;
  const nonRepeatChars = [];
  str.split("").forEach(char => {
    if (str.indexOf(char) === str.lastIndexOf(char)) {
      nonRepeatChars.push(char);
    }
  });

  return nonRepeatChars[0] || "";
};

findFirstNonRepeatChar("ababcbabde"); //?
