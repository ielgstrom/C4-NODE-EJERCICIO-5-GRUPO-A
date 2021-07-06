const { getAnimalesSinDuenyo } = require("./bd/operacionesAnimal");

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
  // se le añade como dueño al animal especificado
};

module.exports = {
  cambiarNombre,
  getAllAnimales,
  getAnimalesFromEspecie,
  getAnimal,
  adoptaAnimal,
};
