function testAry() {
  return ["test", "builder"];
}

const [test, builder] = testAry();

console.log(`${test} ${builder}`);

for (let i = 0; i < 3; i++) {
  (function() {
    let num = i;
    console.log(num);
  })();
}

console.log(num);
