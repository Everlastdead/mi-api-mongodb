const mongoose = require("mongoose");

const estudianteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true },
    telefono: { type: String, required: true },
    rut: { type: String, required: true },
    colegio: { type: String, required: true },
    especialidad: { type: String, required: true },
    contrasena: { type: String, required: true }
});

const Estudiante = mongoose.model('Estudiante', estudianteSchema);
module.exports = Estudiante;