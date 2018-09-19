var express = require('express'); 
var mdAutenticacion = require('../middlewares/autenticacion');

var Hospital = require('../models/hospitalModel');
var app = express();

//====================================//
// ** Listado de Hospitales **
//====================================//
app.get ('/', (req, res, next) => {
    Hospital.find({}, 'nombre img usuarioId').exec((err, hospitales) => {
        if(err){
            return res.status(500).json({
                ok: false,
                errores: err
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: "Lista de hospitales",
            hospitales: hospitales
        });
    });
});

//====================================//
// ** Crear Hospitale **
//====================================//
app.post ('/', mdAutenticacion.verificarToken, (req, res, next) => {
    var usuarioToken = req.usuarioToken;
    var nuevoHospital = new Hospital({
        nombre: req.body.nombre,
        //img: req.body.img,
        usuarioId: usuarioToken._id
    });

    nuevoHospital.save ((err, hospital) => {
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear el hospital.',
                errores: err
            });
        }

        res.status(201).json({
            ok: false,
            mensaje: 'hospital creado con exito.',
            nuevoHospital: hospital,
            usuarioToken: req.usuarioToken
        });
    });
});

//====================================//
// ** Actualizar Hospitales **
//====================================//
app.put('/:id', mdAutenticacion.verificarToken, (req, res, next) => {
    var nuevoHospital = {nombre: req.body.nombre};

    Hospital.findByIdAndUpdate (req.params.id, nuevoHospital, {new: true}, (err, hospitalEditado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar el hospital.',
                errores: err
            });
        }

        if (!hospitalEditado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El hospital no existe.'
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Hospital actualizado con exito.',
            hospital: hospitalEditado
        });
    });
});

//====================================//
// ** Elimina Hospital **
//====================================//    
app.delete('/:id', mdAutenticacion.verificarToken, (req, res, next) => {
    Hospital.findByIdAndRemove (req.params.id, (err, hospital) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al eliminar el hospital.',
                errores: err
            });
        }

        if (!hospital) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El hospital no existe.'
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Hospital eliminado con exito.',
            hospital: hospital
        });
    });
});

module.exports = app;