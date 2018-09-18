var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: 'El {PATH} {VALUE} no es valido.'
}

var usuarioSchema = new Schema({
    nombre: {type: String, required: [true, 'El nombre es obligatorio.']},
    email: {type: String, unique: true, required: [true, 'El correo es obligatorio.']},
    password: {type: String, required: [true, 'La contrasenia es obligatorio.']},
    img: {type: String, required: false},
    rol: {type: String, required: true, default: 'USER_ROLE', enum: rolesValidos}
});

usuarioSchema.plugin(uniqueValidator, {message: 'El {PATH} {VALUE} ya existe.'})

module.exports = mongoose.model('Usuarios', usuarioSchema);