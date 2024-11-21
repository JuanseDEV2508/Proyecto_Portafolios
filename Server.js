const express = require('express');
const path = require('path');
const app = express();

// Configurar carpeta de archivos estáticos
app.use(express.static('portafolios'));

// Servir Portafolios.html como página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'portafolios', 'Portafolios.html'));
});

// Configurar el puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
