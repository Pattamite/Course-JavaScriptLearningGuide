const PLAYER_ATTACK_VALUE = 10;
const PLAYER_STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 15;
const DEFAULT_MAX_HEALTH = 100;
const HEAL_VALUE = 20;

const ATTACK_MODE_NORMAL = "ATTACK";
const ATTACK_MODE_STRONG = "STRONG_ATTACK";

const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";
const LOG_EVENT_ERROR = "ERROR";

let battleLog = [];

let chosenMaxLife;

try {
  chosenMaxLife = getMaxLifeValue();
}
catch (error) {
  console.log(error);
  chosenMaxLife = DEFAULT_MAX_HEALTH;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function getMaxLifeValue() {
  const enteredMaximumLife = prompt("Choose maximum life", DEFAULT_MAX_HEALTH);
  let chosenMaxLife = parseInt(enteredMaximumLife);

  if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    throw { message: "Invalid user input for chosenMaxLife."}
  }

  return chosenMaxLife;
}

function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry;
  logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };
  battleLog.push(logEntry);
}

function reset() {
  let currentMonsterHealth = chosenMaxLife;
  let currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function attackHandler() {
  attackMonster(ATTACK_MODE_NORMAL);
}

function strongAttackHandler() {
  attackMonster(ATTACK_MODE_STRONG);
}

function healPlayerHandler() {
  let healValue;

  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }

  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;

  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );

  endRound();
}

function printLogHanlder() {
  // for (let i = 0; i < battleLog.length; i++) {
  //   console.log(battleLog[i]);
  // }

  for (let i = 0; i < 2; i++) {
    console.log("------------------------------");
  }

  let i = 0;

  // for iterate list
  for (const logEntry of battleLog) {
    console.log(`#${i++}`);

    // for iterate key in object
    for (const key in logEntry) {
      console.log(`${key} -> ${logEntry[key]}`);
    }
  }

  let j = 0;
  outerLoop: do {
    console.log('Outer', j);

    innerLoop: for(let k = j; k < 5; k++) {
      console.log('Inner', k);

      if(k === 3){
        break outerLoop; // work with continue too.
      }
    }

  } while(j < 3);
}

function attackMonster(mode) {
  let maxDamage =
    mode === ATTACK_MODE_NORMAL
      ? PLAYER_ATTACK_VALUE
      : PLAYER_STRONG_ATTACK_VALUE;

  let logEvent;

  switch (mode) {
    case ATTACK_MODE_NORMAL:
      logEvent = LOG_EVENT_PLAYER_ATTACK;
      break;
    case ATTACK_MODE_STRONG:
      logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
      break;
    default:
      logEvent = LOG_EVENT_ERROR;
  }

  const monsterDamage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= monsterDamage;

  writeToLog(
    logEvent,
    monsterDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  endRound();
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;

  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("You use your bonus life!");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("Draw!");

    writeToLog(
      LOG_EVENT_MONSTER_ATTACK,
      "A DRAW",
      currentMonsterHealth,
      currentPlayerHealth
    );

    reset();
  } else if (currentMonsterHealth <= 0) {
    alert("Victory!");

    writeToLog(
      LOG_EVENT_MONSTER_ATTACK,
      "PLAYER WON",
      currentMonsterHealth,
      currentPlayerHealth
    );

    reset();
  } else if (currentPlayerHealth <= 0) {
    alert("Defeat!");

    writeToLog(
      LOG_EVENT_MONSTER_ATTACK,
      "MONSTER WON",
      currentMonsterHealth,
      currentPlayerHealth
    );

    reset();
  }
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHanlder);
