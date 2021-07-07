const inquirer = require("inquirer");
const { getUsuarioPorDNI } = require("./bd/operacionesDuenyo");
const {
  cambiarNombre,
  getAllAnimales,
  getAnimalesFromEspecie,
  getAnimal,
  adoptaAnimal,
} = require("./queries");

const preguntaDni = async () => {
  const respuestas = await inquirer.prompt([
    {
      name: "dniUsuario",
      type: "input",
      message: "Introduzca su DNI: ",
    },
  ]);

  const usuario = await getUsuarioPorDNI(respuestas.dniUsuario);

  if (usuario !== null && typeof usuario.DNI !== "undefined") {
    return usuario;
  } else {
    console.log("No existe el DNI");
    process.exit(0);
  }
};

const preguntaEspecie = async () => {
  const respuestas = await inquirer.prompt([
    {
      name: "especie",
      type: "input",
      message: "Introduzca su el nombre de la especie: ",
    },
  ]);

  return respuestas.especie.toLowerCase();
};
const preguntaChip = async () => {
  const respuestas = await inquirer.prompt([
    {
      name: "chip",
      type: "input",
      message: "Introduzca su el Número del chip: ",
    },
  ]);

  return respuestas.chip.toLowerCase();
};

const preguntaAnimales = async () => {
  const respuestas = await inquirer.prompt([
    {
      name: "consulta",
      type: "list",
      message: "Elija el tipo de consulta ",
      choices: [
        {
          value: "listarAnimales",
          name: "Listar todos mis animales",
        },
        {
          value: "listarAnimalesDeUnaEspecie",
          name: "Listar todos mis animales de una especie",
        },
        {
          value: "datosUnAnimal",
          name: "Mostrar los datos de uno de mis animales",
        },
        {
          value: "adoptarUnAnimal",
          name: "Adoptar un animal",
        },
        {
          value: "cambiarNombre",
          name: "Cambiar mi nombre",
        },
      ],
    },
    {
      name: "nombreNuevo",
      type: "input",
      message: "Introduzca su nuevo Nombre: ",
      when: (respuestas) => respuestas.consulta === "cambiarNombre",
    },
  ]);

  return respuestas;
};

const preguntasUsuario = async () => {
  const usuario = await preguntaDni();
  const { consulta, nombreNuevo } = await preguntaAnimales();

  switch (consulta) {
    case "listarAnimales":
      await getAllAnimales();
      break;
    case "listarAnimalesDeUnaEspecie":
      await getAnimalesFromEspecie(await preguntaEspecie());
      break;
    case "datosUnAnimal":
      getAnimal(await preguntaChip(), usuario.id);
      break;
    case "adoptarUnAnimal":
      // Aqui pasaremos el usuario completo
      adoptaAnimal(usuario);
      break;
    case "cambiarNombre":
      await cambiarNombre(usuario.DNI, nombreNuevo);
      break;

    default:
      process.exit(1);
  }
};

module.exports = { preguntasUsuario };
