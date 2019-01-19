let GCD = (a, b) => {
    if (a == 0) {
      return b;
    } else if (b == 0) {
      return a;
    } else {
      return GCD(b, a % b);
    }
  };

let LCM = (x, y) => {
  return (x * y) / GCD(x, y);
}

function smallestCommons(arr) {
  // console.log(arr);
  let numRange = arr.sort((c, d) => c > d);

  numRange = (function() {
    let arr = [];
    for (let i = numRange[0]; i <= numRange[1]; i++) {
      arr.push(i);
    }
    return arr;
  })();

  // console.log(numRange);
  let result = numRange[0];
  for (let i = 1; i < numRange.length; i++) {
    result = LCM(result, numRange[i]);
  }

  return result;
}
