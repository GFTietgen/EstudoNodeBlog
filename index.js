const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

const categoriesController = require('./categories/CategoriesController');
const articlesController   = require('./articles/ArticlesController');

/*Configuração dos middlewares*/
//View Engine
app.set('view engine', 'ejs');

//Static
app.use(express.static('public'));

//Body-Parser
app.set(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Database
connection
    .authenticate()
    .then(() => {
        console.log("Database connect");
    }).catch((error) =>{
        console.log(error);
    });

app.get("/", (req, res) =>{
    res.render('index');
});


//Rotas
app.use("/", categoriesController);
app.use("/", articlesController);

app.listen(8080, ()=>{
    console.log("Server On...");
});