const { DataTypes } = require("sequelize");
const sequelize = require("./conexionSQL");
const Especie = require("./schemaEspecies");
const Duenyo = require("./schemaDuenyo");

const Animal = sequelize.define(
  "Animal",
  {
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
      type: DataTypes.INTEGER,
    },
    duenyo: {
      type: DataTypes.INTEGER,
    },
    NUM_CHIP: {
      unique: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "animal",
    timestamps: false,
  }
);

Animal.hasOne(Duenyo, { foreignKey: "duenyo" });
Animal.hasOne(Especie, { foreignKey: "especie" });
Duenyo.belongsTo(Animal, { foreignKey: "duenyo" });
Especie.belongsTo(Animal, { foreignKey: "especie" });

module.exports = Animal;
