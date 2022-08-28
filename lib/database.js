const { Sequelize } = require("sequelize");

const db = new Sequelize("todo-app", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
