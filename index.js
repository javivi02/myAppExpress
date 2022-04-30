// const express = require('express')
import express from "express";
import {conexiondb} from "./db.js";

const app = express();
app.use(express.json());
const PORT = 3000;

const conexion = conexiondb();
conexion.connect();

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



