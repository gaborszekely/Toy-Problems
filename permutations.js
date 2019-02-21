function getPermutations(str) {
  let results = [];
  if (str.length === 1) {
    results.push(str);
    return results;
  }

  for (let i = 0; i < str.length; i++) {
    const firstChar = str[i];
    const charsLeft = str.substring(0, i) + str.substring(i + 1);
    const innerPermutations = getPermutations(charsLeft);

    for (let j = 0; j < innerPermutations.length; j++) {
      results.push(firstChar + innerPermutations[j]);
    }
  }

  return results.reduce((acc, item) => {
    acc = acc || [];
    if (!acc.includes(item)) {
      acc.push(item);
    }
    return acc;
  }, []);
}

console.log(getPermutations("ab"));
