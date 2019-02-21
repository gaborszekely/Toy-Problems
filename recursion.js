function pow(x, n) {
  return n <= 1 ? x : x * pow(x, n - 1);
}

pow(2, 3);

let company = {
  sales: [
    {
      name: "John",
      salary: 1000
    },
    {
      name: "Alice",
      salary: 600
    }
  ],

  development: {
    sites: [
      {
        name: "Peter",
        salary: 2000
      },
      {
        name: "Alex",
        salary: 1800
      }
    ],

    internals: [
      {
        name: "Jack",
        salary: 1300
      }
    ]
  }
};

function getSalaries(data) {
  let total = 0;

  for (let key in data) {
    if (Array.isArray(data[key])) {
      total = data[key].reduce((acc, item) => acc + item.salary, total);
    } else {
      total += getSalaries(data[key]);
    }
  }
  return total;
}

getSalaries(company); //?

const sumTo = n => (n <= 1 ? n : n + sumTo(n - 1));

sumTo(5); //?

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

convertLL = list => {
  const { value } = list;
  return list.next === null ? value : [value].concat(convertLL(list.next));
};

convertLL2 = (list, total = []) => {
  total.push(list.value);
  return list.next === null ? total : convertLL2(list.next, total);
};

convertLL3 = list => {
  total = [];
  return function convert(data = list) {
    total.push(data.value);
    return data.next === null ? total : convert(data.next);
  };
};

convertLL(list); //?
convertLL2(list); //?
convertLL3(list)(); //?
