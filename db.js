const mysql = require('mysql2');

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',          // Host para XAMPP
    user: 'root',               // Usuario por defecto en XAMPP
    password: '',               // Contraseña vacía por defecto
    database: 'contactos',     // Nombre de tu base de datos
});

// Probar la conexión
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos exitosa');
});

module.exports = db;
