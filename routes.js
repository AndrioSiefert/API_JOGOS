import { Router } from 'express';
import { usuarioCreate, usuarioIndex, usuarioSenha } from './controllers/usuarioController.js';
import { pontoCreate, pontoDestroy, pontoIndex } from './controllers/pontosController.js';
import { jogoCreate, jogoDestroy, jogoIndex } from './controllers/JogosController.js';
import { loginUsuario } from './controllers/loginController.js';
import { verificaLogin } from './middlewares/verificaLogin.js';

const router = Router();

router
    .get('/usuario', usuarioIndex)
    .post('/usuario', usuarioCreate)
    .put('/usuario', usuarioSenha)

    .get('/ponto', pontoIndex)
    .post('/ponto', pontoCreate)
    .delete('/ponto/:id', verificaLogin, pontoDestroy)

    .get('/jogo', jogoIndex)
    .post('/jogo', jogoCreate)
    .delete('/jogo/:id', verificaLogin, jogoDestroy)

    .get('/login', loginUsuario)


export default router