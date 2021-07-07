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

const app = express();
const puerto = 5000;

const server = app.listen(puerto, () => {
  console.log(`Escuchando puerto ${puerto}`);
});

app.use(express.json());

app.put("/adoptaAnimal", async (req, res, next) => {
  const { dni, idAnimal } = req.body;
  const usuario = await getUsuarioPorDNI(dni);

  if (usuario !== null && typeof usuario.DNI !== "undefined") {
    const existeAnimal = await existeAnimalSinDuenyoPorId(idAnimal);

    if (typeof existeAnimal !== "undefined") {
      const resultado = await anyadirDuenyoMascota(usuario.id, idAnimal);
      const infoAnimal = await getAnimalPorId(idAnimal);
      if (resultado[0] === 1) {
        res.json({
          mensaje: `Has adoptado a ${infoAnimal.nombre}`,
          Animal: infoAnimal.dataValues,
        });
      } else {
        next(new Error());
      }
    } else {
      next({
        codigo: 403,
        error: true,
        message: `No existe un animal con la id ${idAnimal} y que no tenga dueño`,
      });
    }
  } else {
    next({
      codigo: 403,
      error: true,
      message: "No existe ningun usuario con el dni especificado",
    });
  }
});

app.use((req, res, next) => {
  res.status(404).send({ error: true, message: "Recurso no encontrado" });
});

app.use((err, req, res, next) => {
  const codigo = err.codigo || 500;
  const mensajeError = err.codigo ? err.message : "Ha habido un pete general";
  res.status(codigo).send({ error: true, mensaje: mensajeError });
});
