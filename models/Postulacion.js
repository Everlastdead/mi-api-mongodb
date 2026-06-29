const mongoose = require("mongoose");

const postulacionSchema = new mongoose.Schema({
    id_estudiante: { type: String, required: true },
    id_practica: { type: String, required: true },
    fecha_postulacion: { type: Date, default: Date.now },
    estado: { type: String, enum: ['pendiente', 'aceptada', 'rechazada'], default: 'pendiente' },
    carta_presentacion: { type: String, required: true },

});

const Postulacion = mongoose.model('Postulacion', postulacionSchema);
module.exports = Postulacion;