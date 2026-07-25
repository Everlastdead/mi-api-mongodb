const express = require('express');
const router = express.Router(); // <-- Usamos Router en lugar de 'app'
const Estudiante = require('../models/Estudiante'); // <-- Importamos tu modelo

// Ruta POST: Para CREAR un nuevo estudiante
// Nota: Le quitamos el '/api/estudiantes' y lo dejamos como '/' (te explico por qué abajo)
router.post('/', async (req, res) => {
    try {
        const nuevoEstudiante = new Estudiante(req.body);
        const savedEstudiante = await nuevoEstudiante.save();
        res.status(201).json({ mensaje: '¡Estudiante registrado con éxito en la nube!', data: savedEstudiante });
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: 'Error al registrar', error: error.message });
    }
});

// Ruta GET: Para LEER todos los estudiantes guardados
router.get('/', async (req, res) => {
    try {
        const estudiantes = await Estudiante.find();
        res.status(200).json(estudiantes);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener estudiantes', error: error.message });
    }
});

// Ruta POST: Para VALIDAR el Login
router.post('/login', async (req, res) => {
    try {
        const { correo, contrasena } = req.body;
        const estudiante = await Estudiante.findOne({ correo: correo });

        if (!estudiante) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        if (estudiante.contrasena !== contrasena) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        res.status(200).json({ 
            mensaje: 'Login exitoso', 
            usuario: {
                nombre: estudiante.nombre,
                correo: estudiante.correo,
                rut: estudiante.rut,
                id_estudiante: estudiante._id,
                id_institucion: estudiante.id_institucion,
            } 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
});

module.exports = router; // <-- Exportamos todas estas rutas juntas