const express = require("express");
const router = express.Router();
const autor = require("../controllers/mantenimiento-autor");

router.get("/mantenimiento-autores",autor.GetAutor);
router.get("/agregar-autor",autor.GetAgregarAutor);
router.get("/editar-autor/:idAutor",autor.GetEditarAutor);


router.post("/agregar-autor",autor.PostAgregarAutor);
router.post("/editar-autor",autor.PostEditarAutor);
router.post("/eliminar-autor",autor.PostEliminarAutor);


module.exports = router;