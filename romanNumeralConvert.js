// Parse args from commandline
let args = process.argv.slice(2);
console.log("Converting: ", args);

function convertToRoman(num) {
  /*
  Takes integer num as input and returns a string of the number as a
  roman numeral
  */

  // Max number condition check;
  if (num == 1000000) {
    return "M";
  } else if (num <= 0 || num > 100000) {
    return "Not possible to convert: input must be between 0 & 1000000";
  }

  // Initialise all roman numerals to use.
  let reference = [
                  ["I", "IV", "V", "IX"], ["X", "XL","L", "XC"],
                  ["C", "CD", "D", "CM"], ["M", "VM", "V", "MX"],
                  ["X", "XL","L", "XC"], ["C", "CD", "D", "CM"]
                  ];

  // Equivalent value arrays for extra reference.
  let numRef = [1, 4, 5, 9];
  let factor = [1, 10, 100, 1000, 10000, 100000];

  // Total to sub from.
  let tot = num;

  // Return string variable.
  let roman = "";

  // Starting column value index.
  let index = 5;

  // Sub array value index
  let sub = 3;

  // Initialise sub value of each array.
  let subVal;

  // Start loop - while over 0.
  while (tot != 0){

    // If tot is within column bounds, start process.
    if (tot >= factor[index]) {

      // subVal is the factor bu the possible values in the roman system.
      subVal = factor[index] * numRef[sub];

      // If subVal is valid to sub from tot.
      if (subVal <= tot) {

        // Update tot.
        tot -= subVal;

        // Update return string.
        roman += reference[index][sub];

        // Reset sub index.
        sub = 3;

      } else {

        // Else move down sub array.
        sub -= 1;
      }
    } else {

      // Else, move down the column index.
      index -= 1;
    }
  }

  // Return the string variable.
  return roman;

}

convertToRoman(args[0]);
