function flat(ary) {
  return ary.reduce((acc, item) => {
    return Array.isArray(item) ? [...acc, ...flat(item)] : [...acc, item];
  }, []);
}

console.log(flat([1, 2, 3, [4, 5, [6, [7]]]]));
