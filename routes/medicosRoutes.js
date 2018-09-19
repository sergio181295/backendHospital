var express = require('express');
var Medico = require('../models/medicoModel');
var mdAuntenticacion = require('../middlewares/autenticacion');
var app = express();

//====================================//
// ** Lista de Medico **
//====================================//
app.get ('/', (req, res, next) => {
    Medico.find ({}, (err, medicos) => {
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al cargar lista de medicos',
                errores: err
            });
        }

        res.status(200).json({
            ok: false,
            mensaje: 'Lista de medicos',
            medicos: medicos
        });
    });
});

//====================================//
// ** Crear Medicos **
//====================================//
app.post ('/', mdAuntenticacion.verificarToken, (req, res, next) => {
    var nuevoMedico = new Medico({
        nombre: req.body.nombre,
        usuarioId: req.usuarioToken._id,
        hospitalId: req.body.hospitalId
    });

    nuevoMedico.save ((err, medicoCreado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear el medico',
                errores: err
            });
        }

        res.status(200).json({
            ok: false,
            mensaje: 'Medico creado con exito.',
            medico: medicoCreado
        });
    });
});

//====================================//
// ** Actualizar Medicos **
//====================================//
app.put('/', mdAuntenticacion.verificarToken, (req, res, next) => {
    var nuevoMedico = {
        nombre: req.body.nombre
    };

    if (req.body.hospitalId !== null && req.body.hospitalId !== undefined){
        nuevoMedico.hospitalId = req.body.hospitalId;
    }

    Medico.findByIdAndUpdate (req.query.id, nuevoMedico, {new: true}, (err, medicoEditado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al actualizar el medico',
                errores: err
            });
        }

        if(!medicoEditado){
            return res.status(400).json({
                ok: false,
                mensaje: 'El medico no existe',
                errores: err
            });
        }

        res.status(200).json({
            ok: false,
            mensaje: 'Medico actualizado con exito.',
            medico: medicoEditado
        });
    });
});

//====================================//
// ** Eliminar Medicos **
//====================================//
app.delete('/', mdAuntenticacion.verificarToken, (req, res, next) => {
    Medico.findByIdAndRemove (req.query.id, (err, medicoEliminado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al eliminar el medico',
                errores: err
            });
        }

        if (!medicoEliminado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El medico no existe',
                errores: err
            });
        }

        res.status(200).json({
            ok: false,
            mensaje: 'Medico eliminado con exito.',
            medico: medicoEliminado
        });
    });
});

module.exports = app;