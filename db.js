import mysql from "mysql";

export const conexion = mysql.createConnection({
    host: '172.28.1.137',
    user: 'jga',
    password: 'j4v13r',
    database: 'eros'
});

conexion.connect( error =>{
    if ( error ){
        console.log('Error en la conexion a la bbdd')
    }
});