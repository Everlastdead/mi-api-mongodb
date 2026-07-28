const express = require('express');
const router = express.Router();
const Estudiante = require('../models/Estudiante');

// --- RUTA: CREAR UN NUEVO ESTUDIANTE ---
// Maneja tanto AutoRegistro como registros desde Institución
router.post('/', async (req, res) => {
    try {
        const nuevoEstudiante = new Estudiante(req.body);
        const savedEstudiante = await nuevoEstudiante.save();
        
        console.log("DEBUG: Estudiante guardado con éxito:", savedEstudiante.correo);
        
        res.status(201).json({ 
            mensaje: '¡Estudiante registrado con éxito!', 
            data: savedEstudiante 
        });
    } catch (error) {
        console.error("DEBUG: Error en registro:", error.message);

        // MANEJO DE DUPLICADOS (RUT o Correo ya existen)
        if (error.code === 11000) {
            const campo = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ 
                mensaje: `El ${campo} ingresado ya está registrado en el sistema.`,
                error: "DuplicateKey"
            });
        }

        // OTROS ERRORES DE VALIDACIÓN
        res.status(400).json({ 
            mensaje: 'Error al procesar los datos del estudiante', 
            error: error.message 
        });
    }
});

// --- RUTA: LOGIN ESTUDIANTE ---
router.post('/login', async (req, res) => {
    try {
        const { correo, contrasena } = req.body;
        const estudiante = await Estudiante.findOne({ correo: correo });

        if (!estudiante) {
            return res.status(404).json({ mensaje: 'Correo no registrado' });
        }

        if (estudiante.contrasena !== contrasena) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        res.status(200).json({ 
            mensaje: 'Login exitoso', 
            usuario: {
                id_estudiante: estudiante._id,
                nombre: estudiante.nombre,
                apellido: estudiante.apellido,
                correo: estudiante.correo,
                rut: estudiante.rut,
                especialidad: estudiante.especialidad,
                id_institucion: estudiante.id_institucion,
            } 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});

// --- RUTA: OBTENER ALUMNOS POR INSTITUCIÓN ---
router.get("/institucion/:id_institucion", async (req, res) => {
    try {
        const { id_institucion } = req.params;
        const alumnos = await Estudiante.find({ id_institucion: id_institucion });
        res.status(200).json(alumnos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener alumnos", error: error.message });
    }
});

// --- RUTA: ACTUALIZAR ALUMNO ---
router.put("/:id", async (req, res) => {
    try {
        console.log(`DEBUG: Intentando actualizar alumno con ID: ${req.params.id}`);
        
        const { _id, id_estudiante, ...datosParaActualizar } = req.body;

        const estudianteActualizado = await Estudiante.findByIdAndUpdate(
            req.params.id,
            datosParaActualizar,
            { new: true, runValidators: true } // new: true devuelve el objeto ya cambiado
        );

        if (!estudianteActualizado) {
            console.log("DEBUG: Alumno no encontrado para actualizar");
            return res.status(404).json({ mensaje: "Alumno no encontrado" });
        }

        console.log("DEBUG: Alumno actualizado con éxito");
        res.status(200).json({
            mensaje: "Alumno actualizado correctamente",
            data: estudianteActualizado
        });

    } catch (error) {
        console.error("DEBUG: Error al actualizar alumno:", error.message);
        
        if (error.code === 11000) {
            return res.status(400).json({ mensaje: "El RUT o correo ya existen en otro alumno" });
        }
        
        res.status(400).json({ mensaje: "Error al actualizar", error: error.message });
    }
});

// --- RUTA: ELIMINAR ALUMNO ---
router.delete("/:id", async (req, res) => {
    try {
        const eliminado = await Estudiante.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ mensaje: "Alumno no encontrado" });
        res.status(200).json({ mensaje: "Alumno eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar", error: error.message });
    }
});

module.exports = router;