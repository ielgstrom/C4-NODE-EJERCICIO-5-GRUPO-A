const { Op } = require("sequelize");
const Animal = require("./schemas/schemaAnimales");
const Duenyo = require("./schemas/schemaDuenyo");
const Especie = require("./schemas/schemaEspecies");

const getAnimalesSinDuenyo = async () => {
  const animales = await Animal.findAll({
    where: {
      ID_DUENYO: null,
    },
  });

  return animales;
};

const getAnimalPorId = async (id) => {
  const animales = await Animal.findOne({
    where: {
      id,
    },
  });

  return animales;
};

const existeAnimalSinDuenyoPorId = async (idAnimal) => {
  const animalesSinDuenyo = await getAnimalesSinDuenyo();
  const existeAnimal = animalesSinDuenyo.find(
    (animal) => animal.id === idAnimal
  );

  return existeAnimal;
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

    return animalModificado;
  } catch (err) {
    console.log("No se ha podido modificar la mascota.");
    console.log(err.message);
    return false;
  }
};

const buscarAnimalporChip = async (chipAnimal, IDescogido) => {
  try {
    const animalPorChip = await Animal.findOne({
      where: {
        NUM_CHIP: chipAnimal,
        ID_DUENYO: IDescogido,
      },
    });
    if (animalPorChip === null) {
      return undefined;
    }

    const idAnimal = animalPorChip.dataValues.ID_ESPECIE;

    const especiePorChipId = await Especie.findOne({
      where: {
        id: idAnimal,
      },
    });
    return `El chip ${animalPorChip.dataValues.NUM_CHIP} es de ${animalPorChip.dataValues.nombre}, que es un ${especiePorChipId.dataValues.nombre} y tiene ${animalPorChip.dataValues.edad} años.`;
  } catch (err) {
    console.log("No se ha podido encontrar tu animal con ese numero de chip");
    console.log(err.message);
  }
};

const buscarAnimalporIdDuenyo = async (idDueñoEscogido) => {
  try {
    const animalPorIdDuenyo = await Animal.findOne({
      where: {
        ID_DUENYO: idDueñoEscogido,
      },

    });
    if (animalPorIdDuenyo === null) {
      return undefined;
    }
    return `El dueño con id de dueño: ${animalPorIdDuenyo.dataValues.ID_DUENYO}`;
  } catch (err) {
    console.log("No se ha podido encontrar tu animal con ese numero de id de dueño");
    console.log(err.message);
  }
};



module.exports = {
  getAnimalesSinDuenyo,
  anyadirDuenyoMascota,
  buscarAnimalporChip,
  buscarAnimalporIdDuenyo,
  existeAnimalSinDuenyoPorId,
  getAnimalPorId,
};
