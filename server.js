require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// 1. Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error al conectar:", err));

// 2. Conectar tus rutas modulares
// Esto dice: "Todo lo que empiece con /api/estudiantes, mándalo a estudianteRoutes.js"
app.use('/api/estudiantes', require('./routes/estudianteRoutes'));

// Cuando crees las rutas de empresas, solo agregarás esta línea:
app.use('/api/empresas', require('./routes/empresaRoutes'));

app.use("/api/practicas", require('./routes/practicaRoutes'));

app.use('/api/instituciones', require('./routes/institucionRoutes')); 
// <-- 2. DILE A NODE QUE USE ESTA RUTA
// 3. Levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const postulacionRoutes = require("./routes/postulacionRoutes");

app.use("/api/postulaciones", postulacionRoutes);