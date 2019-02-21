const waitUntil = time =>
  new Promise((resolve, reject) => setTimeout(() => resolve(), time));

const words = ["developer", "engineer", "coder"];

// function wordCounter(words, delay) {
//   let counter = words.length;

//   const cycleWord = word => {
//     if (word.length > 0) {
//       console.log(word[0]);
//       return waitUntil(1000).then(() => cycleWord(word.slice(1)));
//     }
//   }

//   const wordCycle = word => Promise.resolve(cycleWord(word));

//   async function start() {
//     if (--counter >= 0) {
//       await wordCycle(words[counter]);
//       // await wordCycle([...words[i]].reverse().join())
//     } else {
//       counter = words.length;
//     }
//   }

//   return function() {
//     setInterval(() => start(), delay);
//   }
// }

// function wordCounter(words, delay, letterDelay) {
//   let i = -1;
//   let j = -1;

//   function start() {
//     if (++i < words.length) {
//       let current = words[i];

//       console.log(words[i]);
//     } else {
//       i = -1;
//     }
//   }

//   return function () {
//     setInterval(() => start(), delay);
//   }
// }

// const myCounter = wordCounter(words, 1000);

//myCounter(); //?
//setInterval(() => myCounter(), 2000); //?
//setInterval(() => x(), 5000); //?

// function cycleWord(word) {
//   let counter = 0;
//   while(counter < word.length) {

//   }
// }

// function counter(words, delay) {
//   let list = transform(words).join("");
//   let i = -1;

//   function start() {
//     if (++i < list.length) {
//       console.log(list[i]);
//     } else {
//       i = -1;
//     }
//   }

//   function transform(wordArr) {
//     let final = [];
//     wordArr.forEach(word => {
//       final.push(word);
//       final.push([...word].reverse().join(""));
//     })
//     return final;
//   }

//   return function () {
//     setInterval(() => start(), delay);
//   }
// }

// const myCounter = counter(words, 1000);

//myCounter(); //?

// Spell out every word
// "Backspace" every word
// Longer pause

// function cycleWord(word) {
//   let counter = 0;
//   while(counter < word.length) {

//   }
// }

// Spell Word Forwards & Backwards
///////////////////////////////////////////////////////////////////

// function counter(word, delay) {
//   let i = -1;
//   let itWord = "";
//   let bool = true;

//   function start() {
//     if (++i < word.length) {
//       bool ? (itWord += word[i]) : itWord = itWord.slice(0, -1);
//       console.log(itWord);
//     } else {
//       bool = !bool;
//       i = -1;
//     }
//   }

//   return function() {
//     setInterval(() => start(), delay);
//   };
// }

// const myCounter = counter("developer", 1000);

//myCounter(); //?

/////////////////////////////////////////////////////////////////////

// Spell Word Forwards & Backwards
///////////////////////////////////////////////////////////////////
// 2
function counter(words, delay) {
  let i = -1;
  let j = -1;
  let itWord = "";
  let bool = true;
  let wordCounter = 0;

  function start() {
    if (wordCounter < words.length) {
      let word = words[wordCounter];
      if (++j < word.length * 2) {
        if (++i < word.length) {
          bool ? (itWord += word[i]) : (itWord = itWord.slice(0, -1));
          //if (itWord.length > 0) {
          document.getElementById("target").innerHTML = itWord;
          //}
        } else {
          bool = !bool;
          i = -1;
          --j;
        }
      } else {
        wordCounter++;
        j = -1;
        i = -1;
        bool = !bool;
      }
    } else {
      wordCounter = 0;
      j = -1;
      i = -1;
    }
  }

  return function() {
    setInterval(() => start(), delay);
  };
}

/////////////////////////////////////////////////////////////////////
