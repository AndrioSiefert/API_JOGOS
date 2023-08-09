import { Usuario } from "../models/Usuario.js";
import { Log } from "../models/Log.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();


export const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        res.status(400).json({ erro: "Informe os dados corretamente!" })
        return;
    }

    try {
        const usuario = await Usuario.findOne({ where: { email } })

        if (usuario == null) {
            res.status(400).json({ erro: "Email Invalido" })
            return
        }

        if (bcrypt.compareSync(senha, usuario.senha)) {
            const token = jwt.sign({
                id_logged: usuario.id,
                nome_logged: usuario.nome
            },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
            )
            res.status(200).json({ msg: "Login Efetuado", token })

        } else {
            await Log.create({
                descricao: "Tentativa de Acesso com senha Invalida",
                usuario_id: usuario.id
            })
            res.status(400).json({ erro: "Senha Invalida" })
        }

    } catch (error) {
        res.status(400).json(error)
    }

}