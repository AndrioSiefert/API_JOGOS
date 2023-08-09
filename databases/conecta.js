import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  "jogos_api", "root", "1234", {
  dialect: "mysql",
  host: "localhost",
  port: 3306
});