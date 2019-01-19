let args = process.argv.slice(2);

function telephoneCheck(str) {
  /*
  Takes input string which should resemble a US phone number. Function outputs
  true / false if it is a valid US phone number.
  */

  // Check for invalid characters.
  let alphabetCheck = /[^0-9()-\s]/g;
  let hasAlpha = alphabetCheck.test(str);

  if (hasAlpha) {
    return false;
  }

  // If 11 digits long, check for correct area code.
  let allDigits = str.match(/[0-9]/g);
  let hasCountry = allDigits.length == 11;
  let wrongCountryCode = allDigits[0] != 1;

  if (hasCountry && wrongCountryCode) {
    return false;
  }

  // Negative code check.
  let negativeCheck = str.match(/^-[0-9]/);
  if (negativeCheck) {
    return false;
  }

  // If not 11, has to be 10.
  let invalidLength = allDigits.length != 10;
  if (!hasCountry && invalidLength) {
    return false;
  }

  // Check matched open brackets, correct usage or only 1 set.
  let brackets = /\(([0-9]+)\)/g;
  let goodBrackets = /\(([0-9]{3})\)/g.test(str);
  let hasBrackets = brackets.test(str);
  let oneBracket = (/\(/.test(str) && !(/\)/.test(str))) || (/\)/.test(str) && !(/\(/.test(str)));

  if (hasBrackets) {
    let notOneSet = str.match(brackets).length != 1;

    if (notOneSet) {
      return false;
    } else if (!goodBrackets) {
      return false;
    }
  } else if (oneBracket) {
    return false;
  }

  return true;
}

telephoneCheck(args[0]);
