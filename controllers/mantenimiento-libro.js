const autores = require("../models/autores");
const editoriales = require("../models/editoriales");
const libros = require("../models/libros");

exports.GetLibro = (req, res, next) => {


    libros.findAll({ include: [{ model: autores }, { model: editoriales }] , order: [["nombre", "ASC"]] }).then(result => {
        const libros = result.map(result => result.dataValues);
        res.render("libros/mantenimiento-libros", {
            pageTitle: "Mantenimiento de Libros",
            activeLibro: true,
            libros: libros,
            hasLibros: true,
            hasLibros: libros.length>0
        });
    }).catch(err => {
        console.log(err);
    })

}

exports.GetAgregarLibro = (req, res, next) => {

    autores.findAll({ order: [["nombre", "ASC"]] }).then((result) => {
        const arrayAutores = result.map((result) => result.dataValues);
        editoriales.findAll({ order: [["nombre", "ASC"]] }).then((result) => {
            const arrayEditoriales = result.map((result) => result.dataValues);

            res.render("libros/agregar-libro", {
                pageTitle: "Agregar Libro",
                autores: arrayAutores,
                editoriales: arrayEditoriales,
                notAutores: arrayAutores == "",
                notEditoriales: arrayEditoriales == "",
            });

        }).catch(err => {
            console.log(err);
        })

    }).catch(err => {
        console.log(err);
    })

};

exports.PostAgregarLibro = (req, res, next) => {

    const nombre = req.body.nombre;
    const año = req.body.año;
    const idAutor = req.body.idAutor;
    const idEditorial = req.body.idEditorial;

    libros.create({
        nombre: nombre,
        año: año,
        autoreId: idAutor,
        editorialId: idEditorial
    }).then(result => {
        res.redirect("/mantenimiento-libros")
    }).catch(err => {
        console.log(err)
    })
};

exports.GetEditarLibro = (req, res, next) => {

    if (!req.query.edit) {
        res.redirect("/mantenimiento-libros")
    }
    const id = req.params.idLibro;
    libros.findOne({ where: { id: id } }).then(result => {
        const libro = result.dataValues;
        autores.findAll({order:[['nombre', 'ASC']]}).then(result => {
            const arrayAutores = result.map(result => result.dataValues)
            editoriales.findAll({order:[['nombre', 'ASC']]}).then(result => {
                const arrayEditoriales = result.map(result => result.dataValues)

                res.render("libros/agregar-libro",
                    {
                        pageTitle: "Editar Libro",
                        editMode: true,
                        libro: libro,
                        autores: arrayAutores,
                        editoriales: arrayEditoriales
                    })
            })
        }).catch(err => {
            console.log(err)
        }).catch(err => {
            console.log(err)
        });
    }).catch(err => {
        console.log(err)
    });

};

exports.PostEditarLibro = (req, res, next) => {

    const nombre = req.body.nombre;
    const año = req.body.año;
    const idAutor = req.body.idAutor;
    const idEditorial = req.body.idEditorial;
    const id = req.body.id;

    libros.update({
        nombre: nombre,
        año: año,
        autoreId: idAutor,
        editorialId: idEditorial,
    },
        {where: {id:id}})
        .then(result => {
            res.redirect("/mantenimiento-libros");
        }).catch(err => {
            console.log(err)
        })

};

exports.PostEliminarLibro = (req, res, next) => {

    const id = req.body.id;
    libros.destroy({where: {id:id}})
        .then(result => {
            res.redirect("/mantenimiento-libros");
        })
        .catch(err=>{
            console.log(err)
        })

}