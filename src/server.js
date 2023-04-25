import dotev from 'dotenv';
import app from "./app.js";

dotev.config();

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando: http://localhost:${process.env.PORT}`)
});