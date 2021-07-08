const inquirer = require("inquirer");
const {
  getAnimalesSinDuenyo,
  anyadirDuenyoMascota,
  buscarAnimalporChip,
  buscarAnimalporIdDuenyo,
} = require("./bd/operacionesAnimal");
const {
  getUsuarioPorDNI,
  nuevoNombreUsuario,
} = require("./bd/operacionesDuenyo");

const cambiarNombre = async (dni, nombreNuevo) => {
  // Sacamos el usuario segun el DNI
  const pedro = await nuevoNombreUsuario(dni, nombreNuevo);
  console.log(`Te has cambiado el nombre a ${nombreNuevo}`);
  process.exit(0);
  // Cambiamos el nombre y lo ponemos en la base de datos
};

const getAllAnimales = async (idDuenyo) => {
  // Listar todos los animales ordenados por especie y por nombre
  const animalPorIdDuenyo = await buscarAnimalporIdDuenyo(idDuenyo);
  if (animalPorIdDuenyo === undefined) {
    console.log(`Este dueño no tiene ningun animalito, su DNI es: ${idDuenyo}`);
    process.exit(0);
  }
  console.log(animalPorIdDuenyo);
  process.exit(0);
};

const getAnimalesFromEspecie = async (especie) => {
  // Listar animales de una especie
};

const getAnimal = async (numChip, dni) => {
  const animalPorChip = await buscarAnimalporChip(numChip, dni);
  if (animalPorChip === undefined) {
    console.log(`No tienes ningun animal con chip numero ${numChip}`);
    process.exit(0);
  }
  console.log(animalPorChip);
  process.exit(0);
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

  await anyadirDuenyoMascota(usuario.id, respuesta.animalAdopcion.id);

  console.log(`Has adoptado a ${respuesta.animalAdopcion.nombre}`);
  process.exit(0);
};

module.exports = {
  cambiarNombre,
  getAllAnimales,
  getAnimalesFromEspecie,
  getAnimal,
  adoptaAnimal,
};
