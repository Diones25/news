const dotev = require('dotenv');
const chalk = require('chalk');
const app = require("./app.js");

dotev.config();

app.listen(process.env.PORT, () => {
  console.log(chalk.bgGreenBright.black(`Servidor rodando: http://localhost:${process.env.PORT}`));
});