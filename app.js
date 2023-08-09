import express from 'express';
import cors from 'cors';
import routes from './routes.js';

import { sequelize } from './databases/conecta.js';
import { Usuario } from './models/Usuario.js';
import { Jogo } from "./models/Jogo.js";
import { Ponto } from "./models/Ponto.js";
import { Log } from './models/Log.js';

const app = express();
const port = 3000

app.use(express.json())
app.use(cors())
app.use(routes)


async function conecta_db() {
    try {
        await sequelize.authenticate();
        await Usuario.sync();
        await Jogo.sync();
        await Ponto.sync();
        await Log.sync();
    }
    catch (error) {
        console.error("Erro na conexão com o banco", error)
    }
}
conecta_db();

app.get('/', (req, res) => {
    res.send('API DE META-CRITICA')
})

app.listen(port, () => {
    console.log(`Servidor Rodando da porta: ${port}`);
})