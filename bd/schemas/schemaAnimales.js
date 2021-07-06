const { DataTypes } = require("sequelize");
const sequelize = require("..");
const especie = require("./schemaEspecies");
const duenyo = require("./schemaDuenyo");

const animal = sequelize.define("animal", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  edad: {
    type: DataTypes.INTEGER,
  },
  especie: {
    type: DataTypes.STRING(30),
  },
  NUM_CHIP: {
    unique: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = animal;
