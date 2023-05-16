const { Sequelize } = require('sequelize');
const chalk = require('chalk');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.BD, 'root', '', {
    host: process.env.HOST,
    dialect: 'mysql'
});

try {

    sequelize.authenticate();
    console.log(chalk.bgGreenBright.black('Conectado com sucesso!'));

} catch (error) {
    console.log(chalk.bgRedBright.black(`Não foi possível conectar: ${error}`));
}

module.exports = sequelize;