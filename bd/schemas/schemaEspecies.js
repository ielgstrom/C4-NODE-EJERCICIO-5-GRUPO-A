const { DataTypes} = require ("sequelize");
const sequelize = require ("..");
const Especies = require("./Especies");


const Especies = sequelize.define(
    "Especies",
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
    }
)

module.exports = Especies;


