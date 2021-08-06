const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const path = require("path");
const comparar = require("./util/helpers/comparar")

app.use(express.static(path.join(__dirname,"public")))//CARPETA PUBLICA
app.use(express.urlencoded({extended:false}));

//ROUTES
const index = require("./routes");
const page404 = require("./routes/404")
const autor = require("./routes/matenimiento-autor");
const editorial = require("./routes/matenimiento-editorial");
const libro = require("./routes/matenimiento-libro");


//MODELS
const modelAutores = require("./models/autores");
const modelEditoriales = require("./models/editoriales");
const modelLibros = require("./models/libros");
const sequelize = require("./util/database");


//HANDLEBARS
app.engine("hbs",handlebars({
    layoutsDir:"views",
    defaultLayout: "layout/main-layout",
    extname: "hbs",
    helpers:{comparar: comparar.comparar}
    
}
));
app.set("view engine", "hbs");
app.set("views","views");

//MIDDLEWARE
app.use(index);
app.use(autor);
app.use(editorial);
app.use(libro);

app.use(page404);

modelLibros.belongsTo(modelAutores,{constraint: true,onDelete: "CASCADE"});
modelAutores.hasMany(modelLibros);
modelLibros.belongsTo(modelEditoriales,{constraint: true,onDelete: "CASCADE" });
modelEditoriales.hasMany(modelLibros);


sequelize.sync().then(result=>{  
    app.listen(5001);
}).catch(err =>{
    console.log(err);
});

