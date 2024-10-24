const dayjs = require('dayjs');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const currDate = dayjs(); // .toDate();
const randomLowInt = getRandomInt(15, 50);
const randomHighInt = getRandomInt(-3, 14);
const randomReservationFromDate = currDate.subtract(randomLowInt, 'day');
const randomReservationToDate = currDate.subtract(randomHighInt, 'day');
console.log(`from: ${randomReservationFromDate.toString()}`);
console.log(`to: ${randomReservationToDate.toString()}`);
console.log(randomLowInt);
console.log(randomHighInt);

console.log(randomReservationToDate.diff(randomReservationFromDate, 'day'));
// if (randomReservationToDate.diff(randomReservationFromDate, 'day'))
