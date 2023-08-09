import { Ponto } from '../models/Ponto.js';
import { Jogo } from '../models/Jogo.js';
import { sequelize } from '../databases/conecta.js';


export const pontoIndex = async (req, res) => {
    try {
        const ponto = await Ponto.findAll({
            include: Jogo
        });
        res.status(200).json(ponto)
    } catch (error) {
        res.status(400).send(error)
    }
}




// CRIAÇÃO E TRANSIÇÃO DA PONTUAÇÃO DOS JOGOS

export const pontoCreate = async (req, res) => {
    const { nome, comentario, pontuacao, jogo_id } = req.body;

    if (!nome || !comentario || !pontuacao || !jogo_id) {
        res.status(400).json({ id: 0, msg: "Informe todos os dados solicitados!" })
        return;
    }

    const t = await sequelize.transaction();
    try {
        const ponto = await Ponto.create({
            jogo_id, nome, comentario, pontuacao
        }, { transaction: t });

        await Jogo.increment('score',
            { by: pontuacao, where: { id: jogo_id }, transaction: t }
        );

        await Jogo.increment('num',
            { by: 1, where: { id: jogo_id }, transaction: t }
        );

        await t.commit();
        res.status(201).json(ponto);

    } catch (error) {
        await t.rollback();
        res.status(400).json({ id: 0, "Erro": error })
    }
}





// REMOVE A TRANSIÇÃO DA PONTUAÇÃO DOS JOGOS FEITO PELO USUARIO

export const pontoDestroy = async (req, res) => {
    const { id } = req.params;

    const t = await sequelize.transaction();
    try {
        const ponto = await Ponto.findByPk(id)

        await Jogo.decrement('score',
            { by: ponto.pontuacao, where: { id: ponto.jogo_id }, transaction: t }
        );

        await Jogo.decrement('num',
            { by: 1, where: { id: ponto.jogo_id }, transaction: t }
        );


        await Ponto.destroy({
            where: { id }
        });

        await t.commit();
        res.status(200).json({ msg: "Pontuação excluída com sucesso!" });

    } catch (error) {
        await t.rollback();
        res.status(400).json({ id: 0, "Erro": error })
    }
}