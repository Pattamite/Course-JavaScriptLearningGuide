const randomNumber = Math.random(); // produces random number between 0 (including) and 1 (excluding)

if(randomNumber > 0.7) {
  alert(`First number (${randomNumber}) is greater than 0.7`);
}

const arr = [1, 2, 3, 4, 5];

for(let i = arr.length - 1; i >= 0; i--) {
  console.log(arr[i]);
}

console.log('-----------')

for(const num in arr) {
  console.log(num);
}

const randomNumber2 = Math.random();

if(randomNumber > 0.7 && randomNumber2 > 0.7) {
  alert(`Both number (${randomNumber} & ${randomNumber2}) are greater than 0.7`);
}

if(randomNumber <= 0.2 || randomNumber2 <= 0.2) {
  alert(`Some number (${randomNumber} & ${randomNumber2}) are not greater than 0.2`);
}