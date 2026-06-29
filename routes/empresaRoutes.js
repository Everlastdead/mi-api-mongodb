const express = require('express');
const router = express.Router(); // <-- Usamos Router en lugar de 'app'
const Empresa = require('../models/Empresa'); // <-- Importamos tu modelo

// Ruta POST: Para CREAR un nuevo estudiante
// Nota: Le quitamos el '/api/estudiantes' y lo dejamos como '/' (te explico por qué abajo)
router.post('/', async (req, res) => {
    try {
        const nuevaEmpresa = new Empresa(req.body);
        const savedEmpresa = await nuevaEmpresa.save();
        res.status(201).json({ mensaje: '¡Empresa registrada con éxito en la nube!', data: savedEmpresa });
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: 'Error al registrar', error: error.message });
    }
});

// Ruta GET: Para LEER todos los estudiantes guardados
router.get('/', async (req, res) => {
    try {
        const empresas = await Empresa.find();
        res.status(200).json(empresas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener empresas', error: error.message });
    }
});

// Ruta POST: Para VALIDAR el Login
router.post('/login', async (req, res) => {
    try {
        const { rut_empresa, contrasena } = req.body;
        const empresa = await Empresa.findOne({ rut_empresa: rut_empresa });

        if (!empresa) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        if (empresa.contrasena !== contrasena) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        res.status(200).json({ 
            mensaje: 'Login exitoso', 
            usuario: {
                nombre: empresa.nombre_empresa,   // <-- Corregido
                correo: empresa.correo_contacto,  // <-- Corregido
                rut_empresa: empresa.rut_empresa,
                id_empresa: empresa._id

            } 
        });;

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
});

module.exports = router; // <-- Exportamos todas estas rutas juntas