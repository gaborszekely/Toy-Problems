let gabor = {
  name: "Gabor",
  age: 28,
  email: "gabor@dev.io"
};

let Kara = {
  name: "Kara",
  age: 29,
  email: "sexykara@hotmail.com"
};

const view = (lens, field) => lens.view(field);
const set = (lens, obj, value) => lens.set(obj, value);

const makeLens = field => ({
  view: obj => obj[field],
  set: (obj, val) => ({
    ...obj,
    [field]: val
  })
});

let name = makeLens("name");
name.view(gabor); //?
view(name, gabor); //?
set(name, gabor, "Gabe"); //?
