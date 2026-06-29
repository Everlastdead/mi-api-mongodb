const express = require("express");
const router = express.Router();
const Practica = require("../models/Practica"); // Asegúrate de que la ruta a tu modelo sea correcta

// ==========================================
// 1. CREAR UNA NUEVA OFERTA DE PRÁCTICA
// Ruta: POST /api/practicas
// ==========================================
router.post("/", async (req, res) => {
    try {
        // Node.js toma todo el JSON que enviaste desde Android (req.body)
        const nuevaPractica = new Practica(req.body);
        
        // Lo guarda en MongoDB
        await nuevaPractica.save();

        res.status(201).json({
            mensaje: "¡Oferta de práctica publicada exitosamente!",
            data: nuevaPractica
        });
    } catch (error) {
        console.error("Error al publicar la práctica:", error);
        res.status(400).json({ 
            mensaje: "Hubo un error al guardar la práctica", 
            error: error.message 
        });
    }
});

// ==========================================
// 2. OBTENER TODAS LAS PRÁCTICAS ABIERTAS (Para los estudiantes)
// Ruta: GET /api/practicas
// ==========================================
router.get("/", async (req, res) => {
    try {
        // Busca todas las prácticas que tengan el estado "abierta"
        const practicas = await Practica.find({ estado: "abierta" });
        
        res.status(200).json(practicas);
    } catch (error) {
        console.error("Error al obtener las prácticas:", error);
        res.status(500).json({ 
            mensaje: "Error interno del servidor", 
            error: error.message 
        });
    }
});

module.exports = router;