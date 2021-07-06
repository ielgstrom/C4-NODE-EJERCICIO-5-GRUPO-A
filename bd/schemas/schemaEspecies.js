const { DataTypes } = require("sequelize");
const sequelize = require("..");
const duenyo = require("./schemaDuenyo");
const animal = require("./schemaAnimales");

const especies = sequelize.define("especies", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
});

module.exports = especie;

//en este esschema espeecificamos la espeecie de cada animal
