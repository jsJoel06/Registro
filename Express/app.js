// app.js
const express = require('express');
const cors = require('cors');
const { coneccionDB } = require('./db/db.js');

const app = express();
app.use(express.json());
app.use(cors());

let pool;

(async () => {
    pool = await coneccionDB();

    const PUERTO = 4000;
    app.listen(PUERTO, () => {
        console.log(`Servidor corriendo en el puerto: ${PUERTO}`);
    });
})();

// GET: Listar todos los registros
app.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM persona');
        res.json(rows);
    } catch (err) {
        console.error('Error en la consulta: ', err);
        res.status(500).send('Error al obtener las personas');
    }
});

// GET: Buscar por nombre
app.get('/persona/:nombre', async (req, res) => {
    try {
        const { nombre } = req.params;
        const { rows } = await pool.query(
            'SELECT * FROM persona WHERE nombre = $1',
            [nombre]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }

        res.json(rows[0]);
    } catch (err) {
        console.error('Error al obtener persona: ', err);
        res.status(500).send('Error al obtener persona');
    }
});

// POST: Agregar nuevo registro
app.post('/persona', async (req, res) => {
    try {
        const { nombre, correo, edad, fecha_registro } = req.body;
        const edadNum = Number(edad);

        const { rows } = await pool.query(
            'INSERT INTO persona(nombre, correo, edad, fecha_registro) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, correo, edadNum, fecha_registro]
        );

        res.json(rows[0]);
    } catch (err) {
        console.error('Error al agregar persona: ', err);
        res.status(500).send('Error al agregar persona');
    }
});

// PUT: Actualizar registro por nombre
app.put('/persona/:nombre', async (req, res) => {
    try {
        const { nombre } = req.params;
        const { correo, edad, fecha_registro } = req.body;
        const edadNum = Number(edad);

        const { rowCount } = await pool.query(
            'UPDATE persona SET correo = $1, edad = $2, fecha_registro = $3 WHERE nombre = $4',
            [correo, edadNum, fecha_registro, nombre]
        );

        if (rowCount === 0) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }

        res.json({ message: 'Persona actualizada correctamente' });
    } catch (err) {
        console.error('Error al actualizar persona: ', err);
        res.status(500).send('Error al actualizar persona');
    }
});

// DELETE: Borrar por nombre
app.delete('/persona/:nombre', async (req, res) => {
    try {
        const { nombre } = req.params;

        const { rowCount } = await pool.query(
            'DELETE FROM persona WHERE nombre = $1',
            [nombre]
        );

        if (rowCount === 0) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }

        res.json({ message: 'Persona eliminada correctamente' });
    } catch (err) {
        console.error('Error al eliminar persona: ', err);
        res.status(500).send('Error al eliminar persona');
    }
});
