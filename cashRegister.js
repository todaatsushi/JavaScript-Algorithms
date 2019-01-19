let args = process.argv.slice(2);

function checkCashRegister(price, cash, cid) {
  /*
  Takes 3 inputs, price of an item, cash received and the value of monies
  in a cash register (array of arrays).

  Returns an object with two properties - status which is any of the following:
  ["OPEN", "CLOSED", "INSUFFICIENT_FUNDS"]. OPEN indicates there is still money
  in the reg, CLOSED indicates there is no money left and INSUFFICIENT_FUNDS if
  there is not enough. The second property is change which shows the value of
  each money type as an array.

  If the status is CLOSED, it returns the value of every money type. Otherwise,
  if INSUFFICIENT_FUNDS, returns empty and OPEN only returns money used.

  Sample calls:
  checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
  checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
  */

  // Create cid copy.
  cidCopy = cid.map(arr => arr.slice(0));

  // * copy items by 100 for accuracy.
  cidCopy.map(i => [i[0], Math.round(i[1] *= 100)]);

  // Get amount to return.
  let change = Math.round((cash * 100) - (price * 100));
  console.log(`Price: ${price}, Cash: ${cash}. Returning ${change / 100} from ${cid}.`);

  // Create return object with default setting.
  let newCID = {
    status: "INSUFFICIENT_FUNDS",
    change: []
  };

  // Reference dict for every value (already adjusted).
  let values = {
    PENNY: 1,
    NICKEL: 5,
    DIME: 10,
    QUARTER: 25,
    ONE: 100,
    FIVE: 500,
    TEN: 1000,
    TWENTY: 2000,
    "ONE HUNDRED": 10000
  };

  // Create variables for iteration.
  let coin;
  let worth;

  // Createa array for return object for every iteration.
  let changeBox;

  // Loop through all values from largest to smallest
  for (let i = cidCopy.length - 1; i >= 0; i--) {


    // Assign values for name, worth and default array for return object.
    coin = cidCopy[i][0];
    worth = values[coin];
    changeBox = [coin, 0];
    console.log(`Cycling ${coin}, worth: ${worth}`);
    console.log();

    // Chip away at change with the current value until unable to do so.
    while (change >= worth) {
      console.log("Enter loop.")

      // Enough of coin in reg? If false, break loop and move on.
      if (cidCopy[i][1] < worth) {
        console.log("Not enough coins of coin.");
        console.log()
        break;
      } else {

        // Else take 1 unit from change due, money in reg and add onto return
        // array.
        console.log("Start transaction.");
        console.log(`Removing from ${change}, ${worth}`);
        change -= worth;

        console.log(`Remaining change: ${change}`);
        cidCopy[i][1] -= worth;

        console.log(`${coin} value remaining ${cidCopy[i][1]}`);
        changeBox[1] += worth;

        console.log(`Current changebox: ${changeBox}.`);
        console.log()
      }

      // Change due but no coins left? return INSUFFICIENT_FUNDS scenario.
      // Only time change above 0 and no value is if coin is a penny & if that is 0,
      // impossible to return change.
      if (change > 0 && cidCopy[0][1] == 0) {
        console.log("Not enough change.");
        console.log()
        return {status: "INSUFFICIENT_FUNDS", change: []};
      }
    }

    // If there is value in changeBox, add to return object.
    if (changeBox[1] != 0) {
      console.log(`Moving ${changeBox} to ${newCID}`);
      newCID.change.push(changeBox);
      console.log(`Current change: ${newCID}`);
      console.log();
    }

    // Change == 0 means finish, change status depending on scenario, return obj.
    if (change == 0) {
      console.log("Finish")

      // Is cash register empty?
      let total = cidCopy.map(i => i[1]).reduce((a, c) => a + c);
      newCID.status = total == 0 ? "CLOSED" : "OPEN";

      // If closed, return initial arg instead of copy.
      newCID.change = newCID.status == "CLOSED" ? cid : newCID.change.map(i => i[1] /= 100);
      return newCID;
    }
  }

  console.log(newCID);
  return newCID;
}
checkCashRegister(Number(args[0]), Number(args[1]), args[2]);
