// // Higher-order function to be used for splitting string
// var splitByChar = function(base_char) {
//   return function(str) {
//     var result = [];
//     var double_string_open = false;
//     var single_string_open = false;
//     var array_open = false;
//     var object_open = false;
//     var array_bracket_count = 0;
//     var object_bracket_count = 0;
//     var curr_str = "";
//     var prev_ch = "";
//     for (var i = 0; i < str.length; i += 1) {
//       var ch = str[i];
//       if (ch === '"') {
//         double_string_open = !double_string_open;
//       }
//       if (ch === "'") {
//         single_string_open = !single_string_open;
//       }
//       if (ch === "[") {
//         array_bracket_count += 1;
//         array_open = true;
//       }
//       if (ch === "]") {
//         array_bracket_count -= 1;
//         if (array_bracket_count === 0) {
//           array_open = false;
//         }
//       }
//       if (ch === "{") {
//         object_bracket_count += 1;
//         object_open = true;
//       }
//       if (ch === "}") {
//         object_bracket_count -= 1;
//         if (object_bracket_count === 0) {
//           object_open = false;
//         }
//       }
//       if (
//         ch === base_char &&
//         !double_string_open &&
//         !single_string_open &&
//         !array_open &&
//         !object_open
//       ) {
//         if (curr_str !== "") result.push(curr_str.trim());
//         curr_str = "";
//         prev_ch = "";
//       } else {
//         curr_str += ch;
//         prev_ch = ch;
//       }
//     }
//     if (curr_str !== "") result.push(curr_str.trim());
//     return result;
//   };
// };
// var separeateStringByCommas = splitByChar(",");
// var separeateStringByColons = splitByChar(":");

// var obj =
//   '{"a": "b", "c": {"d": "e", "f": [1, 2, 3]}}, {f: "g", h: ["i", "j", "k"]}, [1, 2, 3]';

// console.log(separeateStringByCommas(obj));
