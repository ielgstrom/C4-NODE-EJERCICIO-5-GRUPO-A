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

const getAnimalesConDuenyo = async (idDuenyo) => {
  const animales = await Animal.findAll({
    where: {
      ID_DUENYO: idDuenyo,
    },
  });

  return animales;
};

const anyadirDuenyoMascota = async (idDuenyo, idMascota) => {
  try {
    const animalModificado = await Animal.update(
      {
        ID_DUENYO: idDuenyo,
      },
      {
        where: {
          id: idMascota,
        },
      }
    );
  } catch (err) {
    console.log("No se ha podido modificar la mascota.");
    console.log(err.message);
  }

  return true;
};

module.exports = { getAnimalesSinDuenyo, anyadirDuenyoMascota,getAnimalesConDuenyo};
