const Sequelize = require("sequelize");
const sequelize = require("../util/database")

const libros = sequelize.define("libros",{

    nombre:{
        type: Sequelize.STRING,
        allowNull: false
    },
    año:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = libros;