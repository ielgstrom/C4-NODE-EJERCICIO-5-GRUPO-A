const { Op } = require("sequelize");
const Animal = require("./schemas/schemaAnimales");

const getAnimalesSinDuenyo = async () => {
  const animales = await Animal.findAll({
    where: {
      ID_DUENYO: null,
    },
  });

  return animales;
};

module.exports = { getAnimalesSinDuenyo };
