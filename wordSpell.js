function counter(words, delay) {
  let list = transform(words);
  let i = -1;

  let word = "";
  let forward = true;

  function start() {
    if (++i < list.length) {
    } else {
      i = -1;
      forward = false;
    }
  }

  function transform(wordArr) {
    let final = [];
    wordArr.forEach(word => {
      final.push(word);
      final.push([...word].reverse().join(""));
    });
    return final;
  }

  return function() {
    setInterval(() => start(), delay);
  };
}

const myCounter = counter(words, 1000);

//myCounter(); //?
