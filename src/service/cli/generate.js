'use strict';

const fs = require(`fs`);

const {
  getRandomInt,
  shuffle,
  error,
  info
} = require(`../utils`);

const {
  CATEGORIES,
  SENTENCES,
  PictureRestrict,
  TITLES,
  OfferType,
  SumRestrict,
  DEFAULT_COUNT,
  FILE_NAME,
  MAX_COUNT
} = require(`./generate.data`);

const _getPictureFileName = (num) => {
  return num > 9 ? `item${num}.jpg` : `item0${num}.jpg`;
};

const _getCategories = (count) => {
  return shuffle(CATEGORIES).slice(0, count);
};

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: _getCategories(getRandomInt(1, CATEGORIES.length)),
    description: shuffle(SENTENCES).slice(0, 5).join(` `),
    picture: _getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const countOffer = Number.parseInt(args, 10) || DEFAULT_COUNT;
    if (countOffer > MAX_COUNT) {
      error(`Не больше 1000 объявлений`);
    }

    const content = JSON.stringify(generateOffers(countOffer));
    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        error(`Что-то пошло не так. Не могу записать данные в файл...`);
      }

      info(`Операция выполнена. Файл mocks.json создан!`);
    });
  }
};
