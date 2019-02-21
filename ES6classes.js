class Character {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, ${this.name}`;
  }
}

Character.total = 0;
Character.totalJedis = 2;

Character.new = function() {
  Character.total++;
};

class Jedi extends Character {
  constructor(name, age, color, side) {
    super(name, age);
    this.color = color;
    this.side = side;
  }

  switchSides() {
    if (this.side === "good") {
      this.side = "evil";
    } else {
      this.side = "good";
    }
  }
}

var luke = new Jedi("luke skywalker", 30, "green", "good");

console.log(Character.totalJedis);
