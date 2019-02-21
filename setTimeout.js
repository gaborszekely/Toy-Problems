// let i = 1;
// setTimeout(async function run() {
//   let res = await func(5000);
//   console.log(res);
//   i++;
//   setTimeout(run, 1000);
// }, 1000);

// const func = time =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => resolve("I ran"), time);
//   });

const words = ["foo", "bar", "bop"];

// setTimeout(function test() {
//   if (i <= range) {
//     setTimeout(() => test(i + 1), 1000);
//   }
// }, 3000);

/* PLAN:

  - Store counter, delays in closure
  - Solve timeOut issues with recursive setTimeout calls

*/

function generateLoop(words, letterDelay, wordDelay, reverse = true) {
  let counter = 0;
  let i = 0;
  let reverseBool = false;
  let msg = "";

  return function loop() {
    counter = counter < words.length ? counter : 0;
    let current = words[counter];

    setTimeout(function cycle() {
      if (i < current.length) {
        msg += current[i];
        console.log(msg);
        i++;

        return setTimeout(() => {
          cycle();
        }, letterDelay);
      }
      i = 0;
      msg = "";
      counter++;
      return setTimeout(() => loop(), wordDelay);
    }, 0);
  };
}

//const myLoop = generateLoop(words, 2000, 1000);
//myLoop();

class Typewriter {
  constructor(words, letterDelay, wordDelay, reverse = true) {
    this.letterDelay = letterDelay;
    this.wordDelay = wordDelay;
    this.reverseBool = false;
    this.reverse = reverse;
    this.words = words;
    this.counter = 0;
    this.msg = "";
    this.run = true;
    this.i = 0;
  }

  loop() {
    if (this.i < this.current.length) {
      this.msg += this.current[this.i];
      console.log(this.msg);
      this.i++;
      return (this.looper = setTimeout(() => this.loop(), this.letterDelay));
    }

    this.i = 0;
    this.msg = "";
    this.counter++;

    return setTimeout(
      function() {
        this.start();
      }.bind(this),
      this.wordDelay
    );
  }

  start() {
    if (this.run) {
      const { words } = this;
      this.counter = this.counter < this.words.length ? this.counter : 0;
      let { counter } = this;
      this.current = words[counter];
      this.loop.call(this);
    }
  }

  stop() {
    clearInterval(this.looper);
    this.run = false;
  }
}

const wordLoop = new Typewriter(words, 1000, 3000);

wordLoop.start(); //?

// setTimeout(() => {
//   console.log("STOPPING");
//   wordLoop.stop();
// }, 2200);
