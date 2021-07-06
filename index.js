const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  host: "localhost",
  username: process.env.USUARIO,
  password: process.env.CONTRASENYA,
  database: "animales",
  dialect: "mysql",
  logging: false,
});

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Conectado a la base de datos");
//   })
//   .catch((err) => {
//     console.log("No me he podido conectar a la base de datos");
//     console.log(err.message);
//   });

module.exports = sequelize;
