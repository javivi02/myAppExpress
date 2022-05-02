// const express = require('express')
import express from "express";
import {conexion} from "./db.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3005;

//console.log(conexion)

app.get('/ping', (req, res) => {
    console.log('Alguien hizo ping')
    res.json('pong!')
});

app.get('/usuarios', (req, res) => {
    conexion.query('SELECT * FROM usuarios', function (error, results, fields) {
        if (error) throw error;
        return res.send({error: false, data: results, message: 'users list.'});
    });
});

const sqlTrabajos = `SELECT usuarios.Nombre, tareas.Tarea, idtrabajo, Fecha FROM trabajos 
                    INNER JOIN usuarios ON trabajos.usuarioid=usuarios.idusuarios 
                    INNER JOIN tareas ON trabajos.tareaid=tareas.idtareas 
                    ORDER BY idtrabajo DESC `

app.get('/trabajos', (req, res) => {
    conexion.query(sqlTrabajos, function (error, results, fields) {
        if (error) throw error;
        return res.send({error: false, data: results, message: 'users list.'});
    });
});

app.post('/login', (req, res) => {

    //console.log(req.body);

    const user = req.body;
    if (!user) {
        return res.status(400).send({error: true, message: 'No hay usuarios'});
    }

    const data =[user.usuario, user.password];

    conexion.query('SELECT * FROM usuarios WHERE usuario = ? and password = ?', data,
        (error, results, fields) => {

            console.log(results.length)
            if (error) throw error;

            results.length === 0
                ? res.send({error: true, data: results, message: 'No existe el usuario'})
                : res.send({error: false, data: results, message: 'Resultado del login'});

            return res.send();
    });

})


app.post('/usuario', (req, res) => {
    console.log(req.body)

    let user = req.body;
    if (!user) {
        return res.status(400).send({error: true, message: 'Please provide user'});
    }

    conexion.query("INSERT INTO usuarios SET ? ",
        {
            usuario: user.usuario, password: user.password, apellidos: user.apellidos, nombre: user.nombre,
            puntos: user.puntos, rol: user.rol
        },
        (error, results, fields) => {
            if (error) throw error;
            return res.send({error: false, data: results, message: 'New user has been created successfully.'});
        });
});


app.listen(PORT, () => {
    console.log(`Aplicacion escuchando en el puerto ${PORT}`)
});


/*app.put('/update/:id', (req, res) => {
    const data = [req.body.firstname, req.body.lastname, req.body.roll_number, req.params.id];
    connection.query('UPDATE student SET firstname = ?, lastname = ?, roll_number = ? WHERE id = ?', data, (error, result, fields) => {
        if (error) throw error;
        res.send(result);
    })
});*/


