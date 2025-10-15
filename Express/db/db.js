const mysql = require('mysql2/promise')


const config = {
    url: 'mysql://localhost:8080',
    user: 'root',
    password: 'admin',
    database: 'persona_db'
}

async function coneccionDB() {
    try{
        const coneccion = await mysql.createConnection(config);
        console.log('BD conectada correctamente...')
        return coneccion;
    }catch(err){
        console.error('Error el conectar a Mysql: ', err);
        throw err;
    }
}

module.exports = {coneccionDB}