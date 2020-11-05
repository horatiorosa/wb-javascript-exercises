// run using node

((num1, num2) => {
  let quotient = 0;
  let current = num1;
  while (current >= num2) {
    current = current - num2;
    quotient++;
  }
  console.log(quotient, current);
  console.log(process.argv, process.argv[2], process.argv[3]);
})(parseInt(process.argv[2]), parseInt(process.argv[3]));

/*
  beginner-javascript/test (master)$ node test.js 10 3
  3 1
  [
    '/usr/local/Cellar/node/14.5.0/bin/node',
    '/Users/horatiorosa/LocalDesktop/Courses/beginner-javascript/test/test.js',
    '10',
    '3'
  ] 10 3



  You can pass any number of arguments when invoking a Node.js application using

  node app.js
  Arguments can be standalone or have a key and a value.

  For example:

  node app.js flavio or node app.js name=flavio
  This changes how you will retrieve this value in the Node code.
  The way you retrieve it is using the process object built into Node.
  It exposes an argv property, which is an array that contains all the command line invocation arguments.

  The first argument is the full path of the node command.
  The second element is the full path of the file being executed.
  All the additional arguments are present from the third position going forward.

  further details:
  https://flaviocopes.com/node-cli-args/
*/


/*
JavaScript program that will take any number, divide the number by any number and the output should be how many times the number got divided as well as the modulus of the numbers I’m dividing. I can only write this program using addition and subtraction operations and not the modulus, multiplication, or division.
*/

// run in console

function divide(dividend, divisor) {
  let remainder;
  let quotient = 0;
  let remaining = dividend;

  while (remaining >= divisor) {
    console.log('remaining', remaining, 'divisor', divisor);
    remaining = (remaining - divisor);
    quotient++;
    console.log('remaining', remaining);
  }

  if (remaining === 0) {
    remainder = 0;
  } else if (remaining < divisor) {
    remainder = remaining;
  }

  console.log(`the number of times ${dividend} is divided by ${divisor} is ${quotient} ${quotient > 1 ? 'times' : 'time'} with a remainder of ${remainder}`);
}
