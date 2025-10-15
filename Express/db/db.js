
const { Pool } = require('pg');

const pool = new Pool({
    user: 'root', 
    host: 'dpg-d3o0v32li9vc73cij8ag-a',
    password: 'oo2NNsC3vxKcfjZ2PPveOv71iA9E9dxQ',
    database: 'persona_db_irjf',
    port: 5432, 
});

async function coneccionDB() {
    try {
       
        await pool.query('SELECT NOW()');
        console.log('BD conectada correctamente...');
        return pool; 
    } catch (err) {
        console.error('Error al conectar a Postgres: ', err);
        throw err;
    }
}

module.exports = { coneccionDB };
