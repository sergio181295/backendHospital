//REQUIRES
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//IMPORTAR RUTAS
var appRoutes = require('./routes/router');
var usuarioRoutes = require('./routes/usuariosRoutes');
var loginRoutes = require('./routes/loginRoutes');
var hospitalesRoutes = require('./routes/hospitalesRoutes');
var medicosRoutes = require('./routes/medicosRoutes');

//INICIALIZAR VARIABLES
var app = express();

//BODY PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//CONEXION A DB
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res)=>{
    if(err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
});

//RUTAS
app.use('/', appRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/hospitales', hospitalesRoutes);
app.use('/medicos', medicosRoutes);

//ESCUCHAR PETICIONES
app.listen(3500, () => {
    console.log('Express en puerto 3500: \x1b[32m%s\x1b[0m', 'online');
});       