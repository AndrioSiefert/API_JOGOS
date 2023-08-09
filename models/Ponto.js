import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";
import { Jogo } from "./Jogo.js";

export const Ponto = sequelize.define('ponto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    comentario: {
        type: DataTypes.STRING(500)
    },
    pontuacao: {
        type: DataTypes.INTEGER(2)
    }
}, {
    tableName: 'Pontos'
})

Ponto.belongsTo(Jogo, {
    foreignKey: {
        name: 'jogo_id',
        allowNull: false
    },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
})

Jogo.hasMany(Ponto, {
    foreignKey: 'jogo_id'
})