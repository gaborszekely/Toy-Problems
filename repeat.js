function repeat(func, rep, delay) {
  return function(...args) {
    for (let i = 0; i < rep; i++) {
      setTimeout(function run(j = rep) {
        if (j < rep) {
          func(...args);
          return setTimeout(() => run(j++), delay);
        }
      }, delay);
    }
  };
}

function tester() {
  console.log("I ran");
}

const funcToRun = repeat(tester, 3, 3000);

funcToRun();
