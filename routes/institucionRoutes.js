const express = require("express");
const router = express.Router();
const Institucion = require("../models/Institucion");

// REGISTRAR INSTITUCIÓN
router.post("/", async (req, res) => {
    try {
        const nuevaInstitucion = new Institucion(req.body);
        const saved = await nuevaInstitucion.save();
        res.status(201).json({ mensaje: "¡Registro exitoso!", data: saved });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al registrar", error: error.message });
    }
});

// LOGIN INSTITUCIÓN
router.post("/login", async (req, res) => {
    try {
        const { rut, contrasena } = req.body;
        const inst = await Institucion.findOne({ rut: rut });

        if (!inst || inst.contrasena !== contrasena) {
            return res.status(401).json({ mensaje: "RUT o contraseña incorrectos" });
        }

        res.status(200).json({ 
            mensaje: "Login exitoso", 
            usuario: {
                id_institucion: inst._id,
                nombre: inst.nombre,
                rut: inst.rut,
                correo: inst.correo
            } 
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

module.exports = router;