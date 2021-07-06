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
    ID_ESPECIE: {
      type: DataTypes.INTEGER,
    },
    ID_DUENYO: {
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

Animal.hasOne(Duenyo, { foreignKey: "ID" });
Animal.hasOne(Especie, { foreignKey: "ID" });
Duenyo.belongsTo(Animal, { foreignKey: "ID" });
Especie.belongsTo(Animal, { foreignKey: "ID" });

module.exports = Animal;
