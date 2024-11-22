const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Archivo de conexión a MySQL
const path = require('path')

const app = express();
const port = 3000;

app.use(express.static('portafolios'));

// Servir Portafolios.html como página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'portafolios', 'Portafolios.html'));
});

// Middleware para parsear JSON
app.use(bodyParser.json());

// Ruta para guardar los datos del formulario
app.post('/guardarFormulario', (req, res) => {
    const { nombre, email, mensaje } = req.body;

    // Validación de datos
    if (!nombre || !email || !mensaje) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }

    // Consulta para insertar los datos en la base de datos
    const query = 'INSERT INTO tb_contactos (nombre, correo, mensaje) VALUES (?, ?, ?)';
    db.query(query, [nombre, email, mensaje], (err, result) => {
        if (err) {
            console.error('Error al guardar en la base de datos:', err);
            return res.status(500).json({ success: false, message: 'Error al guardar en la base de datos' });
        }
        res.status(200).json({ success: true, message: 'Formulario guardado exitosamente' });
    });
});

// Ruta para guardar un comentario
app.post('/guardarComentario', (req, res) => {
    const { nombre, comentario } = req.body;

    // Validación de datos
    if (!nombre || !comentario) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }

    const query = 'INSERT INTO tb_comentarios (nombre, comentario) VALUES (?, ?)';
    db.query(query, [nombre, comentario], (err) => {
        if (err) {
            console.error('Error al guardar el comentario en la base de datos:', err);
            return res.status(500).json({ success: false, message: 'Error al guardar el comentario' });
        }
        res.status(200).json({ success: true, message: 'Comentario guardado exitosamente' });
    });
});

// Ruta para obtener los comentarios
app.get('/obtenerComentarios', (req, res) => {
    const query = 'SELECT * FROM tb_comentarios ORDER BY fecha DESC';
    db.query(query, (err, resultados) => {
        if (err) {
            console.error('Error al obtener los comentarios:', err);
            return res.status(500).json({ success: false, message: 'Error al obtener los comentarios' });
        }
        res.status(200).json({ success: true, comentarios: resultados });
    });
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
