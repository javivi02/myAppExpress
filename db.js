import mysql from "mysql";

export const conexiondb = () => {

    return mysql.createConnection({
        host: '172.28.1.137',
        user: 'jga',
        password: 'j4v13r',
        database: 'eros'
    })
}