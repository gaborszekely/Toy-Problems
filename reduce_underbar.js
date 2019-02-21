var _ = {};

_.each = function(collection, iterator) {
  /* START SOLUTION */
  if (typeof iterator === "undefined") {
    iterator = _.identity;
  }

  //let index = Object.keys(collection)
  if (typeof collection === "object" && !Array.isArray(collection)) {
    //var collection = Object.values(collection);
    var convertedcollection = Object.entries(collection);
    for (var i = 0; i < convertedcollection.length; i++) {
      iterator(
        convertedcollection[i][1],
        convertedcollection[i][0],
        collection
      );
    }
    //
  } else if (Array.isArray(collection) || typeof collection === "string") {
    for (var i = 0; i < collection.length; i++) {
      iterator(collection[i], i, collection);
    }
  }
  /* END SOLUTION */
};

_.reduce = (collection, iterator, accumulator) => {
  let result;
  let transformedCollection = Array.isArray(collection)
    ? collection
    : Object.entries(collection);

  if (typeof accumulator === "undefined") {
    if (Array.isArray(collection)) {
      result = collection[0];
    } else {
      result = Object.entries(collection)[0];
    }

    _.each(transformedCollection, function(element, index) {
      index === 0
        ? (result = iterator(result, element)) - result
        : (result = iterator(result, element));
    });
  } else {
    _.each(transformedCollection, function(element) {
      memo = iterator(memo, element);
    });
  }

  return memo;
};

let obj = {
  a: 1,
  b: 2,
  c: 3
};

// _.reduce(
//   obj,
//   function(acc, item) {
//     if (!acc) {
//       acc = [];
//     }
//     acc[item[0]] = item[1];
//     return acc;
//   },
//   {}
// ); //?

_.reduce([1, 2, 3, 4], (acc, item) => acc + item); //?

// let eyesOnWhatValue = colelction[0];
// // FOr first iteration
// if(index === 0) {
//   eyesOnWhatValue = item;
//   result.push(item)
// } else {
//   // For others
//   if (item !== eyesOnWhatValue) {
//     result.push(item);
//     eyesOnWhatValue = item;
//   }
// }

//let array = [1, 2, 3];

// array.reduce(
//   (acc, item) => {
//     console.log(acc);
//     console.log(item);
//   },
//   3
// ); //?
