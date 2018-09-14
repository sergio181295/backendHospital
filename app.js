//REQUIRES
var express = require('express');
var mongoose = require('mongoose');

//INICIALIZAR VARIABLES
var app = express();


//CONEXION A DB
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res)=>{
    if(err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
})
//RUTAS
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'exito'
    });
});

//ESCUCHAR PETICIONES
app.listen(3500, () => {
    console.log('Express en puerto 3500: \x1b[32m%s\x1b[0m', 'online');
});       