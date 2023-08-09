import { Usuario } from "../models/Usuario.js";
import { Jogo } from "../models/Jogo.js";
import { Log } from "../models/Log.js";

export const jogoIndex = async (req, res) => {
    try {
        const jogo = await Jogo.findAll({
            include: Usuario
        });
        res.status(200).json(jogo);
    } catch (error) {
        res.status(400).send(error)
    }
}

export const jogoCreate = async (req, res) => {
    const { nome, valor, usuario_id } = req.body;

    if (!nome || !valor || !usuario_id) {
        res.status(400).json({ id: 0, msg: "Informe todos os dados solicitados!" })
        return;
    }

    try {
        const jogo = await Jogo.create({
            nome, valor, usuario_id
        });
        res.status(201).json(jogo)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const jogoDestroy = async (req, res) => {
    const { id } = req.params;

    try {
        await Jogo.destroy({
            where: { id }
        });

        await Log.create({
            descricao: "Exclusão do jogo" + id,
            usuario_id: 1
        })


        res.status(200).json({ msg: "Excluído com sucesso!" })
    } catch (error) {
        res.status(400).send(error)
    }
}

