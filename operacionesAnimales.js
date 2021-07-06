const { Op } = require("sequelize");
const Animal = require("./schemas/Animal");

const crearAnimal = async () => {
  try {
    const nuevoAnimal = await Animal.create({
      id: 2,
      nombre:"",
      edad: 10,
      especie:"",
      NUM_CHIP: 34,
    });
    console.log(nuevoAnimal.nombre);
  } catch (err) {
    console.log("No se ha podido crear el animal.");
    console.log(err.message);
  }
};

const modificarAnimal = async () => {
  try {
    const animalModificado = await Animal.update(
      {
        edad: 10,
      },
      {
        where: {
          nota: {
            [Op.lt]: 5,
          },
        },
      }
    );
    console.log(animalModificado);
  } catch (err) {
    console.log("No se ha podido modificar el Animal.");
    console.log(err.message);
  }
};

const borrarAnimal = async () => {
  const animalBorrado = await Animal.destroy({
    truncate: true,
  });
  console.log(animalBorrado);
};

const listarAnimal = async () => {
  const Animal = await Animal.findAll({
    where: {
      dni: {
        [Op.like]: "2%",
      },
    },
  });
  for (const Animal of Animals) {
    console.log(`${Animal.id} -> ${Animal.nombre}`);
  }
};

module.exports = {
  listarAnimal,
  crearAnimal,
  modificarAnimal,
  borrarAnimal,
};