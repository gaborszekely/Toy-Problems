const view = (lens, prop) => lens.view(prop);
const set = (lens, value, store) => lens.set(value, store);

const lensProp = prop => ({
  view: store => store[prop],
  set: (value, store) => ({
    ...store,
    [prop]: value
  })
});

const lensName = lensProp('name');
const lensAge = lensProp('age');

const gabor = {
  name: 'Gabor',
  age: 28,
  email: 'gszekely90@gmail.com'
};

const kara = {
  name: 'Kara',
  age: 29,
  email: 'karibou@hotmail.com'
}

view(lensName, gabor); //?
view(lensAge, kara); //?
set(lensName, 'gabe', gabor); //?