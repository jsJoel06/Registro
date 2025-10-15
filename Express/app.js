const express = require('express')
const cors = require('cors');
const {coneccionDB} = require('./db/db.js')


const app = express();
app.use(express.json());
app.use(cors());

let conection;

(async () => {
    conection = await coneccionDB();

    const PUERTO = 4000;
    app.listen(PUERTO, () => {
        console.log(`Servidor corriendo en el puerto: ${PUERTO}`);
    })
})();

//GET: PARA LISTAR LOS REGISTRO
app.get('/', async (req,res) => {
    try{
       const [row] = await conection.execute("SELECT * FROM persona");
       res.json(row);
    }catch(err){
        console.error('Error en la consulta: ', err);
        res.status(500).send('Error al obtener las personas', err.message);
    }
    
});

//GET: PARA BUSCAR POR NOMBRE
app.get('/persona/:nombre', async (req, res) => {
  try {
    const { nombre } = req.params;

    const [rows] = await conection.execute(
      'SELECT * FROM persona WHERE nombre = ?',
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

//POST: PARA AGREGAR NUEVO REGISTRO
app.post('/persona', async (req, res) => {
  try {
    const { nombre, correo, edad, fecha_registro } = req.body;

    
    const edadNum = Number(edad);

    
    const [resultado] = await conection.execute(
      'INSERT INTO persona(nombre, correo, edad, fecha_registro) VALUES (?, ?, ?, ?)',
      [nombre, correo, edadNum, fecha_registro]
    );

    res.json({ id: resultado.insertId, nombre, correo, edad: edadNum, fecha_registro });
  } catch (err) {
    console.error('Error al agregar persona: ', err);
    res.status(500).send('Error al agregar persona');
  }
});

//PUT: PARA ACTUALIZAR REQGISTRO POR NOMBRE
app.put('/persona/:nombre', async (req, res) => {
  try {
    const { nombre } = req.params;
    const { correo, edad, fecha_registro } = req.body;
    const edadNum = Number(edad);

    const [resultado] = await conection.execute(
      'UPDATE persona SET correo = ?, edad = ?, fecha_registro = ? WHERE nombre = ?',
      [correo, edadNum, fecha_registro, nombre]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Persona no encontrada' });
    }

    res.json({ message: 'Persona actualizada correctamente' });
  } catch (err) {
    console.error('Error al actualizar persona: ', err);
    res.status(500).send('Error al actualizar persona');
  }
});

//DELETE: BORRAR DELETE POR NOMBRE
app.delete('/persona/:nombre', async (req,res) => {
  try{
    const {nombre} = req.params;

    const [resultado] = await conection.execute(
      'DELETE FROM persona WHERE nmombre = ?',
      [nombre]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ message: 'Persona no encontrada' });
    }

    res.json({ message: 'Persona eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar persona: ', err);
    res.status(500).send('Error al eliminar persona');
  }
  });
