var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var medicoSchema = new Schema({
    nombre: {type: String, required: [true, 'El nombre es obligatorio.']},
    img: {type: String, required: false},
    usuarioId: { type: Schema.Types.ObjectId, ref: 'Usuarios' }, 
    hospitalId: { type: Schema.Types.ObjectId, ref: 'Hospitales', required: [true, 'El hospital es obligatorio.']}
});

module.exports = mongoose.model('Medicos', medicoSchema);