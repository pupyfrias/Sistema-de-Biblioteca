const express = require("express");
const router = express.Router();
const libro = require("../controllers/mantenimiento-libro");

router.get("/mantenimiento-libros",libro.GetLibro);
router.get("/agregar-libro",libro.GetAgregarLibro);
router.get("/editar-libro/:idLibro",libro.GetEditarLibro);

router.post("/agregar-libro",libro.PostAgregarLibro);
router.post("/editar-libro",libro.PostEditarLibro);
router.post("/eliminar-libro",libro.PostEliminarLibro);



module.exports = router;