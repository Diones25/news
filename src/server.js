import dotev from 'dotenv';
import chalk from 'chalk';
import app from "./app.js";

dotev.config();

app.listen(process.env.PORT, () => {
  console.log(chalk.bgGreenBright.black(`Servidor rodando: http://localhost:${process.env.PORT}`));
});