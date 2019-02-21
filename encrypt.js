const key = "password";
const abc = "abcdefghijklmnopqrstuvwxyz";
const abcLen = abc.length;

function encode(str) {
  let final = "";
  const repeatKey = key
    .repeat(Math.ceil(str.length / key.length))
    .substring(0, str.length);

  for (let i = 0; i < str.length; i++) {
    const strLetter = str[i];
    const keyLetter = repeatKey[i];
    const strLetterIndex = abc.indexOf(strLetter);
    const keyLetterIndex = abc.indexOf(keyLetter);
    const indexSum = strLetterIndex + keyLetterIndex;
    const encodedI =
      indexSum <= abcLen - 1
        ? indexSum
        : Math.abs(abcLen - (strLetterIndex + keyLetterIndex));
    final += abc[encodedI];
  }

  return final;
}

function decode(str) {
  let final = "";
  const repeatKey = key
    .repeat(Math.ceil(str.length / key.length))
    .substring(0, str.length);

  for (let i = 0; i < str.length; i++) {
    const strLetter = str[i];
    const keyLetter = repeatKey[i];
    const strLetterIndex = abc.indexOf(strLetter);
    const keyLetterIndex = abc.indexOf(keyLetter);
    const indexSum = strLetterIndex - keyLetterIndex;
    const encodedI =
      indexSum >= 0
        ? indexSum
        : abcLen - Math.abs(strLetterIndex - keyLetterIndex); //?
    final += abc[encodedI];
  }

  return final;
}

encode("waffles"); //?

decode("laxxhsj"); //?

// 'rovwsoiv'
