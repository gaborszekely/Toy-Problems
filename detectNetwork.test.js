// var FILL_ME_IN = 'Fill this value in';
// var expect = chai.expect;
//
// // Loop through creditCards object by card type
// for(let card in creditCards) {
//   // Create new describe() functions per card type
//   describe(card, function() {
//     const { lengths, prefixes } = creditCards[card];
//     // Loop through lengths
//     lengths.forEach(length => {
//       // Loop through prefixes
//       prefixes.forEach(prefixRange => {
//         // IIFE to generate prefix ranges and it() functions for different prefix and length combos
//         (function(lower, upper) {
//           for(let i = lower; i <= upper; i++) {
//             let prefixStr = i.toString();
//             let num = prefixStr;
//             // Generate random numbers to append to prefix to get desired credit card length
//             for(let j = 0; j < length - prefixStr.length; j++) {
//               num += Math.floor(Math.random() * 10).toString();
//             }
//
//             it(`has a prefix of ${prefixStr} and a length of ${length}`, function() {
//               expect(detectNetwork(num)).to.equal(card);
//             });
//           }
//         })(prefixRange[0], prefixRange[1] || prefixRange[0]);
//       });
//     });
//   });
// }
