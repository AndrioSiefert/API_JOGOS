import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export const verificaLogin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_KEY)
        req.id_logged = decode.id_logged
        req.nome_logged = decode.nome_logged
        next();
    } catch (error) {
        return res.status(401).send({ Erro: "Falha ao autenticar" })
    }
}