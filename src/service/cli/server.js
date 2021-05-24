'use strict';

const {
  HttpCode
} = require(`./const`);

const chalk = require(`chalk`);
const express = require(`express`);
const fs = require(`fs`).promises;

const app = express();
app.use(express.json());

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

app.get(`/offers`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (err) {
    res.send([]);
  }
});

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app
      .listen(port, () => {
        return console.info(chalk.green(`Ожидаю соединений на ${port}`));
      })
      .on(`error`, (err) => {
        return console.error(`Ошибка при создании сервера - `, err);
      });
  }
};
