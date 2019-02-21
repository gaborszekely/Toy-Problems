class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
  }

  setState(arg) {
    if (typeof arg === "Object" && !Array.isArray(arg)) {
      this.state = {
        ...this.state,
        ...arg
      };
    } else {
      this.state = {
        ...this.state,
        ...arg(this.state)
      };
    }
  }
}

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      bool: false,
      string: "abc"
    };
  }

  getCounter() {
    return this.state.counter;
  }

  setCounter(amt) {
    this.setState(prevState => ({
      counter: (prevState.counter += amt)
    }));

    return this.state.counter;
  }
}

const myCounter = new Counter("123");

myCounter.getCounter(); //?
myCounter.setCounter(3); //?
