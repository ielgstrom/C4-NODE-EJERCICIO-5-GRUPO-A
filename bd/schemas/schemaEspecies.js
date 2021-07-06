const { DataTypes } = require("sequelize");
const sequelize = require("./conexionSQL");

const Especie = sequelize.define(
  "Especie",
  {
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
  },
  {
    tableName: "especie",
    timestamps: false,
  }
);

module.exports = Especie;

// en este esschema espeecificamos la espeecie de cada animal
