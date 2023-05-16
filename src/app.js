const express = require('express');
const path = require('path');
const router = require('./routes/routes.js');

const app = express();

//Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Definir pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

module.exports = app;