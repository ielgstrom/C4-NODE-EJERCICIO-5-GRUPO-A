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

module.exports = { getUsuarioPorDNI };
