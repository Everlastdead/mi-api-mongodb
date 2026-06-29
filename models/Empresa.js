const mongoose = require("mongoose");

const empresaSchema = new mongoose.Schema({
    nombre_empresa: { type: String, required: true },
    rut_empresa: { type: String, required: true },
    direccion: { type: String, required: true },
    /*razon_social: { type: String, required: true },*/
    telefono: { type: String, required: true },
    correo_contacto: { type: String, required: true },
    rubro: { type: String, required: true },
    sitio_web: { type: String, required: true },
    contrasena: { type: String, required: true }
});

const Empresa = mongoose.model('Empresa', empresaSchema);
module.exports = Empresa;
