const express = require("express");
const router = express.Router();
const Practica = require("../models/Practica");

// ==========================================
// 1. CREAR UNA NUEVA OFERTA DE PRÁCTICA
// Ruta: POST /api/practicas
// ==========================================
router.post("/", async (req, res) => {
    console.log("=== NUEVA PETICIÓN RECIBIDA ===");
    console.log("Datos del cuerpo (req.body):", req.body);
    try {
        const nuevaPractica = new Practica(req.body);
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

// ==========================================
// 3. NUEVA: OBTENER PRÁCTICAS POR ID DE EMPRESA (Para CompanyEditOfferPage)
// Ruta: GET /api/practicas/empresa/:id_empresa
// ==========================================
router.get("/empresa/:id_empresa", async (req, res) => {
    try {
        const { id_empresa } = req.params;
        
        // Busca en la base de datos todas las ofertas ligadas a este id de empresa
        // Asegúrate de que el campo en tu modelo 'Practica' se llame exactamente 'id_empresa'
        const practicasEmpresa = await Practica.find({ id_empresa: id_empresa });
        
        res.status(200).json(practicasEmpresa);
    } catch (error) {
        console.error("Error al obtener prácticas de la empresa:", error);
        res.status(500).json({ 
            mensaje: "Error al recuperar las ofertas de la empresa", 
            error: error.message 
        });
    }
});

// ==========================================
// 4. NUEVA: MODIFICAR UNA OFERTA DE PRÁCTICA EXISTENTE
// Ruta: PUT /api/practicas/:id
// ==========================================
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        // { new: true } hace que retorne el documento con los cambios ya aplicados
        const practicaModificada = await Practica.findByIdAndUpdate(
            id, 
            datosActualizados, 
            { new: true, runValidators: true }
        );

        if (!practicaModificada) {
            return res.status(404).json({ mensaje: "La oferta de práctica no existe" });
        }

        res.status(200).json({
            mensaje: "¡Oferta actualizada con éxito!",
            data: practicaModificada
        });
    } catch (error) {
        console.error("Error al actualizar la práctica:", error);
        res.status(400).json({ 
            mensaje: "Error al procesar la actualización", 
            error: error.message 
        });
    }
});

module.exports = router;