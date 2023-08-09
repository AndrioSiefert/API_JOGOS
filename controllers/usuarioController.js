import bcrypt from 'bcrypt';
import { Usuario } from "../models/Usuario.js";
import { Log } from "../models/Log.js";

function validaSenha(senha) {

    const mensa = []

    if (senha.length < 8) {
        mensa.push("Erro... sua senha está muito fraca!")
    }

    let pequenas = 0
    let grandes = 0
    let numeros = 0
    let simbolos = 0


    for (const letra of senha) {

        if ((/[a-z]/).test(letra)) {
            pequenas++
        }
        else if ((/[A-Z]/).test(letra)) {
            grandes++
        }
        else if ((/[0-9]/).test(letra)) {
            numeros++
        } else {
            simbolos++
        }
    }

    if (pequenas == 0 || grandes == 0 || numeros == 0 || simbolos == 0) {
        mensa.push("Erro... senha deve possuir letras minúsculas, maiúsculas, números e símbolos")
    }

    return mensa
}

export const usuarioIndex = async (req, res) => {
    try {
        const usuario = await Usuario.findAll();
        res.status(200).json(usuario)
    } catch (error) {
        res.status(400).send(error)
    }

}

export const usuarioCreate = async (req, res) => {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        res.status(404).json({ id: 0, msg: "Informe todos os dados solicitados!" })
        return;
    }
    const mensaValidacao = validaSenha(senha)
    if (mensaValidacao.length >= 1) {
        res.status(400).json({ id: 0, msg: mensaValidacao })
        return
    }
    try {
        const usuario = await Usuario.create({
            nome, email, senha
        });
        res.status(201).json(usuario)
    } catch (error) {
        res.status(400).send(error)

    }
}

export const usuarioSenha = async (req, res) => {
    const { email, senha, novaSenha } = req.body

    if (!email || !senha || !novaSenha) {
        res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
        return
    }

    try {
        const usuario = await Usuario.findOne({ where: { email } })

        if (usuario == null) {
            res.status(400).json({ erro: "Erro... E-mail inválido" })
            return
        }

        const valida = validaSenha(novaSenha)
        if (valida.length >= 1) {
            res.status(400).json({ id: 0, msg: valida })
            return
        }

        if (bcrypt.compareSync(senha, usuario.senha)) {

            const salt = bcrypt.genSaltSync(12)
            const hash = bcrypt.hashSync(novaSenha, salt)
            usuario.senha = hash

            await usuario.save()

            res.status(200).json({ msg: "Ok. Senha Alterada com Sucesso" })
        } else {

            await Log.create({
                descricao: "Tentativa de Alteração de Senha",
                usuario_id: usuario.id
            })

            res.status(400).json({ erro: "Erro... Senha inválida" })
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

