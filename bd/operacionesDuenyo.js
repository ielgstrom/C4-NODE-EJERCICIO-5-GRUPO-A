const { Op } = require("sequelize");
const Duenyo = require("./schemas/schemaDuenyo");

const getUsuarioPorDNI = async (dniUsuario) => {
  const duenyo = await Duenyo.findOne({
    where: {
      DNI: dniUsuario,
    },
  });

  return duenyo;
};

const nuevoNombreUsuario = async (DNIescogido, nuevoNombre) => {
  try {
    const newName = await Duenyo.update(
      {
        nombre: nuevoNombre,
      },
      {
        where: {
          DNI: DNIescogido,
        },
      }
    );
    return newName;
  } catch {
    console.log("No hemos podido cambiar tu nombre, sorry");
    console.log(err.message);
  }
};
module.exports = { getUsuarioPorDNI, nuevoNombreUsuario };
