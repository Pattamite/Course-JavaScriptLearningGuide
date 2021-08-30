function sayHello(name = 'Pattamite') {
  console.log('Hi ' + name);
}

let sayHello2 = (name = 'Pattamite') => {
  console.log();
}

let sayHello3 = (greeting = 'Hi ', name = 'Pattamite') => {
  console.log(greeting + name);
}

let sayHello4 = () => {
  console.log('Hi Pattamite');
}

function checkInput(callbackFunction, ...numbers) {
  if(numbers.length === 0) {
    callbackFunction();
    return;
  }
  
  for(const str of numbers) {
    if(!str) {
      callbackFunction();
      return;
    }
  }
}

function noValidStringAlert() {
  console.log('No Valid String');
}

sayHello('A');
sayHello2('B');
sayHello3('Hello ', 'C');
sayHello4();
checkInput(noValidStringAlert);
checkInput(noValidStringAlert, 'A', '');