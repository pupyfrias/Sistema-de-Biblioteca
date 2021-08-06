const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const autores = sequelize.define("autores",{
    nombre:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    correo: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = autores;

