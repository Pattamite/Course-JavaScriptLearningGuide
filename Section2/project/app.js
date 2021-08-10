const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

//  Get input from input field and parse to integer
function getUserInputAsInt() {
  return parseInt(userInput.value);
}

//  Generate calculation description and output it with current result number
function outputCalculationResult(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription);
}

function writeToLog(
  operationIdentifier,
  prevResult,
  operationNumber,
  newResult
) {
  const logEntry = {
    operationIdentifier: operationIdentifier,
    prevResult: prevResult,
    operationNumber: operationNumber,
    newResult: newResult,
  };

  logEntries.push(logEntry);
  console.log(logEntries);
}

function add() {
  const prevResult = currentResult;
  const userInputValue = getUserInputAsInt();
  currentResult += userInputValue;
  outputCalculationResult("+", prevResult, userInputValue);
  writeToLog("ADD", prevResult, userInputValue, currentResult);

  console.log(typeof userInputValue);
}

function subtract() {
  const prevResult = currentResult;
  const userInputValue = getUserInputAsInt();
  currentResult -= userInputValue;
  outputCalculationResult("-", prevResult, userInputValue);
  writeToLog("SUBTRACT", prevResult, userInputValue, currentResult);
}

function multiply() {
  const prevResult = currentResult;
  const userInputValue = getUserInputAsInt();
  currentResult *= userInputValue;
  outputCalculationResult("*", prevResult, userInputValue);
  writeToLog("MULTIPLY", prevResult, userInputValue, currentResult);
}

function divide() {
  const prevResult = currentResult;
  const userInputValue = getUserInputAsInt();
  currentResult /= userInputValue;
  outputCalculationResult("/", prevResult, userInputValue);
  writeToLog("DIVIDE", prevResult, userInputValue, currentResult);
}

addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
