const mongoose = require("mongoose");

const estudianteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    telefono: { type: String, required: true },
    rut: { type: String, required: true, maxlength: 12 },
    especialidad: { type: String, required: true },
    contrasena: { type: String, required: true },
    origen_registro: { 
        type: String, 
        enum: ['Institucion', 'AutoRegistro'], 
        default: 'AutoRegistro' 
    },
    // Una sola definición correcta para la relación
    id_institucion: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Institucion', 
        default: null 
    },
    estado: { 
        type: String, 
        enum: ['activo', 'pendiente activacion'], 
        default: 'activo' 
    },   
});

// El middleware pre-save debe ir siempre definido. 
// La lógica de "si es de institución" va dentro del hook.
estudianteSchema.pre('save', async function () {
    if (this.origen_registro === 'Institucion' && this.id_institucion) {
        const Institucion = mongoose.model('Institucion');
        const institucion = await Institucion.findById(this.id_institucion);
        if (!institucion) {
            throw new Error('La institución asociada no existe.');
        }
    }
});

const Estudiante = mongoose.model('Estudiante', estudianteSchema);
module.exports = Estudiante;