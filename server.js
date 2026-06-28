require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// 1. Inicializar app y Middleware
const app = express();
app.use(express.json()); // Permite leer los JSON que envíe Android

// 2. Conexión a MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error al conectar:", err));

// 3. Definir el Esquema y Modelo
// Nota: Quité 'idEstudiante' porque MongoDB genera un '_id' único automáticamente
const estudianteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true },
    telefono: { type: String, required: true },
    rut: { type: String, required: true },
    colegio: { type: String, required: true },
    especialidad: { type: String, required: true },
    contrasena: { type: String, required: true }
});

const Estudiante = mongoose.model('Estudiante', estudianteSchema);

// 4. Rutas (Endpoints)

// Ruta POST: Para CREAR un nuevo estudiante (La usará tu app Android)
app.post('/api/estudiantes', async (req, res) => {
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
app.get('/api/estudiantes', async (req, res) => {
    try {
        const estudiantes = await Estudiante.find();
        res.status(200).json(estudiantes);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener estudiantes', error: error.message });
    }
});

// 5. Levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Ruta POST: Para VALIDAR el Login
app.post('/api/login', async (req, res) => {
    try {
        // Extraemos el correo y la contraseña que enviará Android
        const { correo, contrasena } = req.body;

        // 1. Buscamos si existe un estudiante con ese correo
        const estudiante = await Estudiante.findOne({ correo: correo });

        if (!estudiante) {
            // Si no lo encuentra, devolvemos error 404 (Not Found)
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // 2. Si el usuario existe, comparamos la contraseña
        if (estudiante.contrasena !== contrasena) {
            // Si no coinciden, devolvemos error 401 (Unauthorized)
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        // 3. Si todo está perfecto, le damos luz verde a la app
        res.status(200).json({ 
            mensaje: 'Login exitoso', 
            usuario: {
                nombre: estudiante.nombre,
                correo: estudiante.correo,
                rut: estudiante.rut
            } 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
});