// Parse args from commandline
let args = process.argv.slice(2);

// Define function to check palindrome
function palindrome(str) {
  /*
  Checks if input string is a palindrome.
  */
  // Use regex to remove all non chars
  let clean = str.replace(/[\W_]/g, "");

  // Convert to lowercase
  clean = clean.toLowerCase();

  // Init backwards array
  let backwards = [];

  // Loop through word backwards and add to array
  for (let c = clean.length - 1; c >= 0; c--) {
    backwards.push(clean[c]);
  }

  // Paste backwards into string
  backwards = backwards.join("");

  // Backwards == Input
  return backwards == clean;
}

palindrome(args[0]);
