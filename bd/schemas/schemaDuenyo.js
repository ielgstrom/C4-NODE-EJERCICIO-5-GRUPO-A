const { DataTypes } = require("sequelize");
const sequelize = require("./conexionSQL");

const Duenyo = sequelize.define(
  "Duenyo",
  {
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
  },
  {
    tableName: "duenyo",
    timestamps: false,
  }
);

module.exports = Duenyo;
