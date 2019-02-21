class Thing {
  constructor(name = "") {
    const self = this;
    this.name = name;

    this.is_a = new Proxy(
      {},
      {
        get(target, name) {
          self[`is_a_${name.toString()}`] = true;
          return target;
        }
      }
    );

    this.is_not_a = new Proxy(
      {},
      {
        get(target, name) {
          self[`is_a_${name.toString()}`] = false;
          return target;
        }
      }
    );

    this.is_the = new Proxy(
      {},
      {
        get(target, name) {
          target[name] = new Proxy(
            {},
            {
              get(t, n) {
                self[name] = n;
                return t;
              }
            }
          );

          return target[name];
        }
      }
    );

    this.being_the = new Proxy(
      {},
      {
        get(target, name) {
          target[name] = new Proxy(
            {},
            {
              get(t, n) {
                self[name] = n;

                return target;
              }
            }
          );

          return self;
        }
      }
    );
  }

  has(num) {
    const self = this;
    return new Proxy(
      {},
      {
        get(target, name) {
          let elem = new Thing(name);
          if (num === 1) {
            self[name] = elem;
            return elem;
          }

          if (num > 1) {
            self[name] = [];
            for (let i = 0; i < num; i++) {
              self[name] = [
                ...self[name],
                new Thing(name.substring(0, name.length - 1))
              ];
            }
            // self[name].each = function (cb) {
            //   console.log(this)
            //   for (let i = 0; i < self[name].length; i++) {
            //     //console.log("FUCK");
            //     let callback = cb.bind(this[i])
            //     callback(this[i]);
            //   }
            // }.bind(self);
          }
          return self[name];
        }
      }
    );
  }

  having(num) {
    const self = this;

    return new Proxy(
      {},
      {
        get(target, name) {
          let elem = new Thing(name);
          if (num === 1) {
            self[name] = elem;
            return elem;
          }

          if (num > 1) {
            self[name] = [];
            for (let i = 0; i < num; i++) {
              self[name] = [
                ...self[name],
                new Thing(name.substring(0, name.length - 1))
              ];
            }
          }
          return self;
        }
      }
    );
  }
}

function having(num) {
  return this.having(num);
}

const jane = new Thing("Jane");

console.log(jane);

console.log(jane.name);

jane.is_a.fish;
console.log(jane.is_a_fish);

jane.is_not_a.man;
console.log(jane.is_a_man);

jane.is_the.parent_of.joe;
console.log(jane.parent_of);

jane.has(2).legs;

console.log(jane.legs.length);

console.log(jane.legs[0] instanceof Thing);

jane.has(1).arm;
console.log(jane.arm instanceof Thing);

jane.has(1).head.having(2).eyes;

//jane.has(2).arms.each(arm => having(1).hand.having(5).fingers )
//console.log(jane.arms[0]);
// console.log(jane.has(2).arms)

/*
 jane.can.speak(phrase => `${name} says: ${phrase}!`)
  */
