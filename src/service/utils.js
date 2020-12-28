'use strict';

const {
  ExitCode
} = require(`./constants`);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// const shuffle = (someArray) => {
//  for (let i = someArray.length - 1; i > 0; i--) {
//     const randomPosition = Math.floor(Math.random() * i);
//     [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
//   }

//   return someArray;
// };
const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const error = (message) => {
  console.error(message);
  process.exit(ExitCode.error);
};

const info = (message) => {
  console.info(message);
  process.exit(ExitCode.success);
};

module.exports = {
  getRandomInt,
  shuffle,
  error,
  info
};
