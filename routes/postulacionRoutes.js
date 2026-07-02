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

module.exports = router;