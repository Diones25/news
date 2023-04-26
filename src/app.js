import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/routes.js';

const app = express();

//Essas duas linhas faz o dirname funcionar
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Definir pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

export default app;