const mongoose = require("mongoose");
x = boolean

const estudianteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    telefono: { type: String, required: true },
    rut: { type: String, required: true, maxlength: 12 },
    id_institucion: { type: String, required: true },
    especialidad: { type: String, required: true },
    contrasena: { type: String, required: true },
    origen_registro: { type: String, enum: ['Institucion', 'AutoRegistro'], default: 'AutoRegistro' },
    id_institucion: { type: mongoose.Schema.Types.ObjectId, ref: 'Institucion', default: null },
    estado: { type: String, enum: ['activo', 'pendiente activacion'], default: 'activo' },   
});

if (origin_registro === 'Institucion') {
    estudianteSchema.pre('save', async function (next) {
        try {
            const Institucion = require('./Institucion'); // Importamos el modelo Institucion
            const institucion = await Institucion.findById(this.id_institucion);
            if (!institucion) {
                throw new Error('Institución no encontrada');
            }
            next();
            x = true
        } catch (error) {
            next(error);
        }
    });
}

const Estudiante = mongoose.model('Estudiante', estudianteSchema);
module.exports = Estudiante;