// const jay = {
//   name: "Jay",
//   greet() {
//     return "Hello, " + this.name + "!";
//   }
// };

// const kelly = {
//   name: "Kelly"
// };

// jay.greet.call(kelly); //?

// const { greet } = jay;
// greet(); //?

// var greetKelly = jay.greet.bind(kelly);

// greetKelly(); //?

// var object = {
//   data: [1, 2, 3],
//   dataDouble: [1, 2, 3],
//   double: function() {
//     console.log("this inside of outerFn double()");
//     console.log(this);
//     return this.data.map(function(item) {
//       console.log(this); // What is this ???
//       return item * 2;
//     });
//   },
//   doubleArrow: function() {
//     console.log("this inside of outerFn doubleArrow()");
//     console.log(this);
//     return this.dataDouble.map(item => {
//       console.log(this); // What is this ???
//       return item * 2;
//     });
//   }
// };

//object.double();
//object.doubleArrow();

var object = {
  data: [1, 2, 3],
  double() {
    this.data.forEach(function() {
      // Get this to point to object.
      console.log(this === global ? "GLOBAL" : this); // Global object
    }.bind(this));
  }
};

object.double();
