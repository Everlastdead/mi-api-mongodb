const express = require("express");
const router = express.Router();
const Postulacion = require("../models/Postulacion");

router.post("/", async (req, res) => {

    try {

        const postulacion = new Postulacion(req.body);
        await postulacion.save();

        res.status(201).json(postulacion);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al registrar la postulación"
        });

    }

});


router.get("/practica/:id_practica", async (req, res) => {
    
    try {

        const { id_practica } = req.params;
        const postulaciones = await Postulacion.find({ id_practica: id_practica });

        res.json(postulaciones);

    } catch (error) {

        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener postulaciones"
        });

    }

});


router.get("/estudiante/:id_estudiante", async (req, res) => {

    try {

        const { id_estudiante } = req.params;
        const postulaciones = await Postulacion.find({ id_estudiante: id_estudiante });

        res.json(postulaciones);

    } catch (error) {

        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener postulaciones"
        });

    }

});

// Obtener postulaciones por ID de empresa
router.get("/empresa/:id_empresa", async (req, res) => {
    try {
        const { id_empresa } = req.params;
        const lista = await Postulacion.find({ id_empresa: id_empresa });
        res.status(200).json(lista);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener postulaciones", error: error.message });
    }
});

// OBTENER POSTULACIONES DE ALUMNOS DE UNA INSTITUCIÓN
// Esta ruta responde a: GET /api/postulaciones/institucion/:id_institucion
router.get("/institucion/:id_institucion", async (req, res) => {
    try {
        // 1. Buscamos los IDs de todos los alumnos que pertenecen a esa institución
        const alumnos = await Estudiante.find({ id_institucion: req.params.id_institucion }).select('_id');
        const ids = alumnos.map(a => a._id);

        // 2. Buscamos todas las postulaciones hechas por esos alumnos
        const postulaciones = await Postulacion.find({ id_estudiante: { $in: ids } });
        res.json(postulaciones);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener actividad", error: error.message });
    }
});

module.exports = router;