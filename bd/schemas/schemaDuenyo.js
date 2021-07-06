const { DataTypes } = require("sequelize");
const sequelize = require("..");
const animal = require("./schemaAnimales");
const especie = require("./schemaEspecies");

const duenyo = sequelize.define("duenyo", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  edad: {
    type: DataTypes.INTEGER,
  },
  DNI: {
    unique: true,
    type: DataTypes.STRING(9),
    allowNull: false,
  },
});

module.exports = duenyo;
