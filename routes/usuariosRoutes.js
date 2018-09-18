var express = require('express');
var bcrypt = require('bcryptjs');
var app = express();

var mdAutenticacion = require('../middlewares/autenticacion');
var Usuario = require('../models/usuarioModel');

//====================================//
// ** lista de usuario **
//====================================//
app.get('/', (req, res, next) => {
    Usuario.find({}, 'nombre email img role password').exec((err, usuarios) => {
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: "Error al cargar usuarios.",
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'exito usuarios',
            usuarios: usuarios
        });
    });
});

//====================================//
// ** Crear nuevo usuario **
//====================================//
app.post('/', mdAutenticacion.verificarToken,  (req, res, next) => {
    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        rol: body.rol
    });

    usuario.save ((err, usuarioCreado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: "Error al crear el usuario.",
                errores: err
            });
        }

        res.status(201).json({
            ok: true,
            mensaje: 'Usuario creado con exito.',
            usuario: usuarioCreado,
            usuarioToken: req.usuarioToken
        });
    });
}); 

//====================================//
// ** Actualizar usuarios **
//====================================//
app.put('/:id', mdAutenticacion.verificarToken, (req, res, next) => {
    var id = req.params.id;

    //VERIFICAR SI EXISTE EL USUARIO
    Usuario.findById (id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al buscar el usuario.",
                errores: err
            });
        }

        if(!usuario){
            return res.status(400).json({
                ok: false,
                mensaje: "El usuario no existe"
            });
        }

        var body = req.body;

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.rol = body.rol;

        usuario.save ((err, usuarioGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al actualizar el usuario.",
                    errores: err
                });
            }

            usuarioGuardado.password = ':D';
            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        });
    });     
});


//====================================//
// ** Eliminar Usuarios **
//====================================//
app.delete('/:id', mdAutenticacion.verificarToken, (req, res, next) => {
    var id = req.params.id;

    Usuario.findByIdAndRemove (id, (err, usuarioEliminado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: "Error al eliminar el usuario.",
                errores: err
            });
        }

        if (!usuarioEliminado) {
            return res.status(400).json({
                ok: false,
                mensaje: "El usuario no existe"
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioEliminado
        });
    });
});
module.exports = app;