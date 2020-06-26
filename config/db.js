const sequelize = require("sequelize");

const db = new sequelize("restapi", "root", "", {
  dialect: "mysql"
});

db.sync({});

module.exports = db;