const express = require('express');
const path = require('path');
const router = require('./routes/routes.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

const app = express();

//Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Definir pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

//Configuração do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Setando o app para usar as rotas
app.use(router);

//Configuração para receber dados do body
app.use(express.urlencoded({ extended: true }));

//Configuração para permitir objetos JSON
app.use(express.json());

//Middleware de session
app.use(
  session({
    name: "session",
    secret: "bWluaGFoYXNoZGVlbmNydXB0YcOnw6NvQmFzZTY0QA==",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function() {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      //httpOnly: false
      httpOnly: true
    }
  })
);

//flash messages
app.use(flash)

//Configurar sesions na resposta
app.use((req, res, next) => {
  if(req.session.userid) {
    res.locals.session = req.session
  }

  next();
});

module.exports = app;