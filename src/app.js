const express = require('express');
const path = require('path');
const router = require('./routes/routes.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');
const session = require('express-session');
const flash = require('express-flash');

const app = express();

//Configuração para receber dados do body
app.use(express.urlencoded({ extended: true }));

//Configuração para permitir objetos JSON
app.use(express.json());

//Configurando sessões
app.use(session({
  secret: "sadNU¨%4sdho--Mijas76162¨%$&$&W!BxJMAKhs98¨&W*&",
  resave: true,
  saveUninitialized: true
}));

//Configurando flash messages
app.use(flash());

//Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Definir pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Configuração do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Setando o app para usar as rotas
app.use(router);

app.use((req, res) => {
  res.render('404.ejs');
})

module.exports = app;