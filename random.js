let time = parseInt(
  Date.now()
    .toString()
    .slice(-2)
); //?

let seconds = new Date().getSeconds(); //?

let rand = Math.abs(1 - 1 / (time / seconds));

const final = rand < 1 ? rand : 1 / rand; //?
