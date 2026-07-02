const mongoose = require("mongoose");

const postulacionSchema = new mongoose.Schema({
    id_estudiante: { type: mongoose.Schema.Types.ObjectId, ref: 'Estudiante', required: true },
    id_practica: { type: mongoose.Schema.Types.ObjectId, ref: 'Practica', required: true },
    fecha_postulacion: { type: Date, default: Date.now },
    estado: { type: String, enum: ['pendiente', 'aceptada', 'rechazada'], default: 'pendiente' },
    carta_presentacion: { type: String, required: true },

});

const Postulacion = mongoose.model('Postulacion', postulacionSchema);
module.exports = Postulacion;