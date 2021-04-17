'use strict';

const {
  getRandomInt,
  shuffle,
  getRandomItemsFromArray,
  getRandomDate
} = require(`../../utils`);

const {
  CATEGORIES, SENTENCES, TITLES
} = require(`../../data/generate`);

const {
  AnnounceRestrict, ExitCode
} = require(`./const`);

const fs = require(`fs`);

const DEFAULT_COUNT_OFFER = 1;
const MAX_COUNT_OFFER = 1000;
const MOCKS_FILE_NAME = `mocks.json`;
const MONTH_DIFFERENCE_BETWEEN_DATES = 3;

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT_OFFER;

    if (countOffer > MAX_COUNT_OFFER) {
      console.error(`Не больше 1000 объявлений`);
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile(MOCKS_FILE_NAME, content, (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
        process.exit(ExitCode.error);
      }

      return console.info(`Operation success. File created.`);
    });
  }
};

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    announce: shuffle(SENTENCES).slice(AnnounceRestrict.MIN, AnnounceRestrict.MAX).join(` `),
    fullText: shuffle(SENTENCES).slice(1, SENTENCES.length - 1).join(` `),
    createdDate: getRandomDate(MONTH_DIFFERENCE_BETWEEN_DATES),
    category: getRandomItemsFromArray(CATEGORIES),
  }))
);
