const autores = require("../models/autores");

exports.GetAutor = (req, res, next) => {

    autores.findAll({order:[['nombre', 'ASC']]}).then(result => {
        const autores = result.map(result => result.dataValues)

        res.render("autores/mantenimiento-autores", {
            pageTitle: "Mantenimiento de Autores",
            autores: autores,
            hasAutores: autores.length>0,
            activeAutor: true
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.GetAgregarAutor = (req, res, next) => {

    res.render("autores/agregar-autor", { pageTitle: "Agregar Autor" });
};

exports.PostAgregarAutor = (req, res, next) => {

    const nombre = req.body.nombre;
    const correo = req.body.correo;

    autores.create({
        nombre: nombre, correo: correo
    }).then(result => {
        res.redirect("/mantenimiento-autores");
    }).catch(err => {
        console.log(err);
    })
};

exports.GetEditarAutor = (req, res, next) => {

    const id = req.params.idAutor;

    if (!req.query.edit) {
        res.redirect("/");
    }
    else {
        autores.findOne({ where: { id: id } })
            .then(result => {
                autor = result.dataValues;
                if (!autor) {
                    res.redirect("/");
                }
                res.render("autores/agregar-autor", {
                    pageTitle: "Editar autor",
                    editMode: true,
                    id: id,
                    autor: autor
                });
            })
            .catch(err => {
                console.log(err);
            });


    }

};

exports.PostEditarAutor = (req, res, next) => {

    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const id = req.body.id;

    autores.update({
        nombre: nombre,
        correo: correo
    },
        {where: {id: id}
        }).then(result => {
            res.redirect("/mantenimiento-autores")
        }).catch(err => {
            console.log(err);
        });
}

exports.PostEliminarAutor = (req, res, next) => {

    const id = req.body.id;

    autores.destroy({where: {id: id }})
        .then(result => {
            res.redirect("/mantenimiento-autores")
        }).catch(err => {
            console.log(err);
        });
};

