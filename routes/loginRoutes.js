var express = require('express');        
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
var Usuario = require('../models/usuarioModel');    

var app = express();

app.post ('/', (req, res, next) => {

    var body = req.body;

    //VERIFICAR CORREO
    Usuario.findOne({email: body.email}, (err, usuario) => {
        
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al buscar el email.",
                errores: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: "El email no existe"
            });
        }

        //VERIFICAR PASSWORD
        console.log(usuario);
        
        if(!bcrypt.compareSync(body.password, usuario.password)){
            return res.status(400).json({
                ok: false,
                mensaje: "Password incorrecto."
            });
        }

        //CREAR TOKEN
        usuario.password = ':D';
        var token = jwt.sign({ usuario: usuario }, SEED, {expiresIn: 14400});

        res.status(200).json({
            ok: true,
            mensaje: 'Login ok.',
            usuario: usuario,
            token: token
        });
    });
});

module.exports = app;