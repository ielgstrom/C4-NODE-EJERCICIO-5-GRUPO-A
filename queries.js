const inquirer = require("inquirer");
const {
  getAnimalesSinDuenyo,
  anyadirDuenyoMascota,
} = require("./bd/operacionesAnimal");

const cambiarNombre = async (dni, nombreNuevo) => {
  // Sacamos el usuario segun el DNI
  // Cambiamos el nombre y lo ponemos en la base de datos
};

const getAllAnimales = async () => {
  // Listar todos los animales ordenados por especie y por nombre
};

const getAnimalesFromEspecie = async (especie) => {
  // Listar animales de una especie
};

const getAnimal = async (numChip) => {
  // Listar los datos de un animal con el numero de chip especificado
};

const adoptaAnimal = async (usuario) => {
  // Listamos todos los animales sin dueño y creamos una pregunta donde debe elegir cual se queda
  const animales = await getAnimalesSinDuenyo();

  // Se le añade como dueño al animal especificado
  const animalesFormateados = animales.map((animal) => {
    const animalTemp = {};

    animalTemp.value = { nombre: animal.nombre, id: animal.id };
    animalTemp.name = `${animal.nombre}, ${animal.ID_ESPECIE}`;
    return animalTemp;
  });

  const respuesta = await inquirer.prompt([
    {
      name: "animalAdopcion",
      type: "list",
      message: "Elija la mascota que quiere adoptar ",
      choices: animalesFormateados,
    },
  ]);

  anyadirDuenyoMascota(usuario.id, respuesta.animalAdopcion.id);
};

module.exports = {
  cambiarNombre,
  getAllAnimales,
  getAnimalesFromEspecie,
  getAnimal,
  adoptaAnimal,
};
