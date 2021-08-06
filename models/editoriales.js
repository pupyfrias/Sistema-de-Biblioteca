const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const editoriales = sequelize.define("editorial",{

    nombre:{
        type: Sequelize.STRING,
        allowNull: false
    },
    telefono:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    pais:{
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = editoriales;