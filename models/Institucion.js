const mongoose = require('mongoose');

const institucionSchema = new mongoose.Schema({
    nombre: { type: String, required: true , maxlength: 150},
    direccion: { type: String, required: true },
    rut: { type: String, unique: true, required: true, maxlength: 12 },
    telefono: { type: String, required: true },
    correo: { type: String, required: true,maxlength: 150 },
    contrasena: { type: String, required: true },

});

const Institucion = mongoose.model('Institucion', institucionSchema);
module.exports = Institucion;
