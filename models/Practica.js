const mongoose = require("mongoose");

const practicaSchema = new mongoose.Schema({
    // Así se hace una relación profesional a otra tabla en MongoDB
    id_empresa: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true },
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    requisitos: { type: String, required: true },
    region: { type: String, required: true },
    comuna: { type: String, required: true },
    area: { type: String, required: true },
    duracion_dias: { type: Number, required: true }, // Lo cambiamos a Number para que coincida con tu Kotlin
    fecha_inicio: { type: Date, required: true },
    fecha_fin: { type: Date, required: true },
    modalidad: { type: String, enum: ['presencial', 'remota', 'mixta'], required: true },
    cupos_disponibles: { type: Number, required: true },
    pago_o_beneficios: { type: String, required: true }, // Unimos tus dos ideas
    estado: { type: String, enum: ['abierta', 'cerrada'], default: 'abierta' },
    preguntas_postulacion: { type: [String], default: [] } // default: [] significa que si no envían nada, se guarda vacío y no da error
});

const Practica = mongoose.model('Practica', practicaSchema);
module.exports = Practica;