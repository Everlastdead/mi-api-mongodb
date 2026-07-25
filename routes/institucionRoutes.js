const express = require("express");
const router = express.Router();
const Postulacion = require("../models/Postulacion");

router.post("/", async (req, res) => {

    try {

        const institucion = new Institucion(req.body);
        await institucion.save();

        res.status(201).json(institucion);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al registrar la Institución"
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