const dotev = require('dotenv');
const chalk = require('chalk');
const app = require("./app.js");
const conn = require('./db/conn.js');
const Users = require('./models/Users.js');
const News = require('./models/News.js');

dotev.config();

conn
  //.sync({ force: true })
  .sync()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(chalk.bgGreenBright.black(`Servidor rodando: http://localhost:${process.env.PORT}`));
    });
  })