const editoriales = require("../models/editoriales")

exports.GetEditorial = (req, res, next) => {

    editoriales.findAll({order:[['nombre', 'ASC']]}).then(result => {
        const editoriales = result.map(result => result.dataValues);
        res.render("editoriales/mantenimiento-editoriales", {
            pageTitle: "Mantenimiento de Editoriales",
            editoriales: editoriales,
            hasEditoriales: editoriales.length > 0,
            activeEditorial: true,
        });
    }).catch(err => {
        console.log(err)
    });
}

exports.GetAgregarEditorial = (req, res, next) => {

    res.render("editoriales/agregar-editorial", {
        pageTitle: "Agragar Editoriales"
    });
}

exports.PostAgregarEditorial = (req, res, next) => {

    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const pais = req.body.pais;

    editoriales.create({
        nombre: nombre,
        telefono: telefono,
        pais: pais
    })
        .then(result => {
            res.redirect("/mantenimiento-editoriales");
        }).catch(err => {
            console.log(err)
        })
}

exports.GetEditarEditorial = (req, res, next) => {

    const id = req.params.idEditorial;

    if(!req.query.edit){
        res.redirect("/mantenimiento-editoriales")
    }
    editoriales.findOne({ where: { id: id } }).then(result => {

        const editorial = result.dataValues;
        res.render("editoriales/agregar-editorial", {
            pageTitle: "Editar Editoriales",
            editMode: true,
            editorial: editorial,

        });
    }).catch(err => {
        console.log(err)
    });
}

exports.PostEditarEditorial = (req, res, next) => {

    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const pais = req.body.pais;
    const id = req.body.id;

    editoriales.update({
        nombre: nombre,
        telefono: telefono,
        pais: pais
    },
        {
            where: {
                id: id
            }
        }).then(result => {
            res.redirect("/mantenimiento-editoriales");
        }).catch(err => {
            console.log(err)
        });
};

exports.PostEliminarEditorial = (req, res, next) => {

    const id = req.body.id;
    editoriales.destroy({where: {id:id}})
        .then(result => {
            res.redirect("/mantenimiento-editoriales");
        })
        .catch(err=>{
            console.log(err)
        })

}