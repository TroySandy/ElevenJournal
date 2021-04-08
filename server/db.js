const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:Beta2682@localhost:5432/eleven-journal"
);

module.exports = sequelize;
