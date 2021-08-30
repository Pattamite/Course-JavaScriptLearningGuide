const startGameBtn = document.getElementById("start-game-btn");

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const DEFAULT_USER_CHOICE = ROCK;

const RESULT_DRAW = "DRAW";
const RESULT_PLAYER_WINS = "PLAYER_WINS";
const RESULT_COMPUTER_WINS = "COMPUTER_WINS";

let gameIsRunning = false;

function getPlayerChoice() {
  const selection = prompt(
    `${ROCK}, ${PAPER} or ${SCISSORS}?`,
    ""
  ).toUpperCase();

  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    alert("Invalid choice! We chose Rock for you!");
    return DEFAULT_USER_CHOICE;
  }

  return selection;
}

function getComputerChoice() {
  const randomValue = Math.random();

  if (randomValue < 0.33) {
    return ROCK;
  } else if (randomValue < 0.66) {
    return PAPER;
  } else {
    return SCISSORS;
  }
}

//wtf is this...
const getWinner = (cChoice, pChoice = DEFAULT_USER_CHOICE) => {
  return cChoice === pChoice
    ? RESULT_DRAW
    : (cChoice === ROCK && pChoice === PAPER) ||
      (cChoice === PAPER && pChoice === SCISSORS) ||
      (cChoice === SCISSORS && pChoice === ROCK)
    ? RESULT_PLAYER_WINS
    : RESULT_COMPUTER_WINS;
};

startGameBtn.addEventListener("click", () => {
  if (gameIsRunning) {
    return;
  }

  gameIsRunning = true;
  console.log("Game is starting...");
  const playerChoice = getPlayerChoice();
  console.log(playerChoice);
  const computerChoice = getComputerChoice();
  const result = getWinner(computerChoice, playerChoice);
  console.log(computerChoice);
  console.log("---------");

  let message = `You picked ${playerChoice}, computer picked ${computerChoice}. `;

  if (result === RESULT_DRAW) {
    message += "You had a draw.";
  } else if (result === RESULT_PLAYER_WINS) {
    message += "You won.";
  } else if (result === RESULT_COMPUTER_WINS) {
    message += "You lost.";
  } else {
    message += "ERROR.";
  }

  alert(message);

  gameIsRunning = false;
});


// not related to game

function showResult(message, number) {
  alert(message + number)
}

function combine(resultHandler, operation, ...numbers) {

  function validateNumber(number) {
    return isNaN(number) ? 0 : number;
  }

  let sum = 0;
  for (const num of numbers) {
    
    if (operation === 'ADD') {
      sum += validateNumber(num);
    }
    else if  (operation === 'SUBTRACT') {
      sum -= validateNumber(num);
    }
  }

  resultHandler(sum);
  return sum;
}

combine(showResult.bind(this, 'The result after adding all numbers is: '),
  'ADD', 1, 2, 3, 4, 5);
combine(showResult.bind(this, 'The result after subtracting all numbers is: '),
  'SUBTRACT', 1, 2, 3, 4, 5);
