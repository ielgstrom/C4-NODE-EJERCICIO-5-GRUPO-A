const express = require("express");
const {
  getAnimalesSinDuenyo,
  anyadirDuenyoMascota,
  buscarAnimalporChip,
  existeAnimalSinDuenyoPorId,
  getAnimalPorId,
} = require("./bd/operacionesAnimal");

const {
  getUsuarioPorDNI,
  nuevoNombreUsuario,
} = require("./bd/operacionesDuenyo");

const Duenyo = require("./bd/schemas/schemaDuenyo");

const app = express();
const puerto = 5000;

const server = app.listen(puerto, () => {
  console.log(`Escuchando puerto ${puerto}`);
});

app.use(express.json());

// Adopta un animal segun un json con la siguiente estructura
/**
 * {
 * "dni": dni del usuario
 * "idAnimal": id del animal a adoptar
 * }
 */
app.put("/adoptaAnimal", async (req, res, next) => {
  // Recoge el dni y la idAnimal del body
  const { dni, idAnimal } = req.body;

  // Comprobamos si existe el usuario con ese dni y si existe continua
  const usuario = await getUsuarioPorDNI(dni);

  if (usuario !== null && typeof usuario.DNI !== "undefined") {
    // Comprueba si existe un animal sin dueño con la id de animal especificada
    const existeAnimal = await existeAnimalSinDuenyoPorId(idAnimal);

    // Si existeAnimal no es undefined continuara añadiendo el dueño
    if (typeof existeAnimal !== "undefined") {
      // Añade el dueño
      const resultado = await anyadirDuenyoMascota(usuario.id, idAnimal);

      // Saca el resto de la informacion del animal para ser enviado de una forma bonica
      const infoAnimal = await getAnimalPorId(idAnimal);

      // Si ha podido añadir el dueño al animal envia un mensaje y la informacion del animal adoptado
      if (resultado[0] === 1) {
        res.json({
          mensaje: `Has adoptado a ${infoAnimal.nombre}`,
          Animal: infoAnimal.dataValues,
        });
      } else {
        // Envia un error general
        next(new Error());
      }
    } else {
      // Si no existe el animal envia un objeto al manejador de errores con estructura personalizada
      next({
        codigo: 403,
        error: true,
        message: `No existe un animal con la id ${idAnimal} y que no tenga dueño`,
      });
    }
  } else {
    // Si falla el DNI envia un objeto al manejador de errores con estructura personalizada
    next({
      codigo: 403,
      error: true,
      message: "No existe ningun usuario con el dni especificado",
    });
  }
});

//Esta sera la funcion que cambia de nombre de la persona seleccionada
app.put("/cambiarNombre", async (req, res, next) => {
  const { dni, nombre } = req.body;
  const usuario = await getUsuarioPorDNI(dni);
  if (usuario !== null && typeof usuario.DNI !== "undefined") {
    const nuevoNombre = await nuevoNombreUsuario(usuario.DNI, nombre);
    if (nuevoNombre[0] === 1) {
      res.json({
        mensaje: `Te has cambiado el nombre a ${nombre}`,
      });
    } else {
      // Envia un error general
      next(new Error());
    }
  } else {
    next({
      codigo: 403,
      error: true,
      message: "No existe ningun usuario con el dni especificado",
    });
  }
});

app.use("/mostrarUnAnimal", async (req, res, next) => {
  const { dni, numChip } = req.body;
  const duenyo = await Duenyo.findOne({
    where: {
      DNI: dni,
    },
  });
  if (duenyo !== null) {
    const usuario = await getUsuarioPorDNI(duenyo.DNI);
    if (usuario !== null && typeof usuario.DNI !== "undefined") {
      const animalConsultado = await buscarAnimalporChip(numChip, duenyo.id);
      if (animalConsultado !== undefined) {
        res.json({
          mensaje: animalConsultado,
        });
      } else {
        const nuevoError = new Error(
          `No tienes ningun animal con numero de chip ${numChip}`
        );
        nuevoError.codigo = 400;
        // Envia un error general
        return next(nuevoError);
      }
    }
  } else {
    next({
      codigo: 403,
      error: true,
      message: "No existe ningun usuario con el dni especificado",
    });
  }
});

// Error de ruta no encontrada
app.use((req, res, next) => {
  res.status(404).send({ error: true, message: "Recurso no encontrado" });
});

// Manejador de errores
app.use((err, req, res, next) => {
  const codigo = err.codigo || 500;
  const mensajeError = err.codigo ? err.message : "Ha habido un pete general";
  res.status(codigo).send({ error: true, mensaje: mensajeError });
});
