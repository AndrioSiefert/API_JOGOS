import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";
import { Usuario } from "./Usuario.js";

export const Jogo = sequelize.define('jogo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    valor: {
        type: DataTypes.FLOAT(9, 2),
        allowNull: false,
    },
    score: {
        type: DataTypes.INTEGER(10),
        defaultValue: 0
    },
    num: {
        type: DataTypes.INTEGER(9),
        defaultValue: 0
    }
}, {
    tableName: 'Jogos',
    paranoid: true,
});

Jogo.belongsTo(Usuario, {
    foreignKey: {
        name: 'usuario_id',
        allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})

