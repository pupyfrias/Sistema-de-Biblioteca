const express = require("express");
const router = express.Router();
const editorial = require("../controllers/mantenimiento-editorial");

router.get("/mantenimiento-editoriales",editorial.GetEditorial);
router.get("/agregar-editorial",editorial.GetAgregarEditorial);
router.get("/editar-editorial/:idEditorial",editorial.GetEditarEditorial);


router.post("/agregar-editorial",editorial.PostAgregarEditorial);
router.post("/editar-editorial",editorial.PostEditarEditorial);
router.post("/eliminar-editorial",editorial.PostEliminarEditorial);


module.exports = router;