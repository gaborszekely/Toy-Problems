function flat(ary) {
  return ary.reduce((acc, item) => {
    return Array.isArray(item) ? [...acc, ...flat(item)] : [...acc, item];
  }, []);
}

/*

m a t h i s f u n

*/
var recoverSecret = function(triplets) {
  let chars = [...new Set(flat(triplets))];

  const before = {},
    after = {};

  chars.forEach(char => {
    before[char] = [];
    after[char] = [];
  })

  triplets.forEach(row => {
    row.forEach((char, i) => {
      let next = row[i + 1];
      let next2 = row[i + 2];
      let prev = row[i - 1];
      let prev2 = row[i - 2];

      if (next && !after[char].includes(next)) { after[char].push(next) }
      if (next2 && !after[char].includes(next2)) { after[char].push(next2) }
      if (prev && !before[char].includes(prev)) { before[char].push(prev) }
      if (prev2 && !before[char].includes(prev2)) { before[char].push(prev2) }
      // if(i === 0) {
      //   if (!after[char].includes(row[i + 1])) { after[char].push(row[i + 1]) }
      //   if (!after[char].includes(row[i + 2])) { after[char].push(row[i + 2]) }
      // }

      // if (i === 1) {
      //   if (!after[char].includes(row[i + 1])) { after[char].push(row[i + 1]) }
      //   if (!after[char].includes(row[i + 2])) { after[char].push(row[i + 2]) }
      // }

      // if (i === 2) {
      //   if (!after[char].includes(row[i + 1])) { after[char].push(row[i + 1]) }
      //   if (!after[char].includes(row[i + 2])) { after[char].push(row[i + 2]) }
      // }
    })
  });
  console.log(before)
  // console.log(after);
  let final = "";

  for(let i = 0; i < chars.length - 2; i++) {
    let results = [];
    for(let x in before) {
      if(before[x].length === i) {
        results.push(x);
      }
    }

    if(results.length === 1) {
      final += results[0];
    } else {
      let aLengths = [];
      results.forEach(res => aLengths.push([res, after[res].length]));
      console.log(aLengths)
      aLengths
        .sort((a, b) => a[1] < b[1])
        .forEach(i => final += i[0])
    }
  }

  return final;
};

let secret1 = "whatisup";
let triplets1 = [
  ["t", "u", "p"],
  ["w", "h", "i"],
  ["t", "s", "u"],
  ["a", "t", "s"],
  ["h", "a", "p"],
  ["t", "i", "s"],
  ["w", "h", "s"]
];

/*

m a t h 



*/
let triplets2 = [
  ["t", "s", "f"],
  ["a", "s", "u"],
  ["m", "a", "f"],
  ["a", "i", "n"],
  ["s", "u", "n"],
  ["m", "f", "u"],
  ["a", "t", "h"],
  ["t", "h", "i"],
  ["h", "i", "f"],
  ["m", "h", "f"],
  ["a", "u", "n"],
  ["m", "a", "t"],
  ["f", "u", "n"],
  ["h", "s", "n"],
  ["a", "i", "s"],
  ["m", "s", "n"],
  ["m", "s", "u"]
];

console.log(recoverSecret(triplets2));
