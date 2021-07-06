const inquirer = require("inquirer");
const { cambiarNombre } = require("./queries");

const preguntaDni = async () => {
  const respuestas = await inquirer.prompt([
    {
      name: "dniUsuario",
      type: "input",
      message: "Introduzca su DNI: ",
    },
  ]);

  // TODO: Comprobar que existe el DNI
  if (true) {
    return respuestas.dniUsuario;
  } else {
    console.log("No existe el DNI");
    process.exit(0);
  }
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
  const dni = await preguntaDni();
  const { consulta, nombreNuevo } = await preguntaAnimales();

  switch (consulta) {
    case "listarAnimales":
      break;
    case "listarAnimalesDeUnaEspecie":
      break;
    case "datosUnAnimal":
      break;
    case "adoptarUnAnimal":
      break;
    case "cambiarNombre":
      cambiarNombre(dni, nombreNuevo);

      break;

    default:
      process.exit(1);
      break;
  }
};

module.exports = { preguntasUsuario };
