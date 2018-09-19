var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var hospitalSchema = ({
    nombre: {type: String, required: [true, 'El nombre es obligatorio']},
    img: {type: String, required: false},
    usuarioId: {type: Schema.Types.ObjectId, ref: 'Usuarios'}
});

module.exports = mongoose.model('Hospitales', hospitalSchema);