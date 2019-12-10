'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes'); //Mantengo esta ruta siguien el esquema de Jose.

const app = express();
app.use(bodyParser.json());
app.use(cors());


//ESPACIO PARA LAS RUTAS
/*
//
//
//
//
//
//
//
//
*/


app.get('/', (req, res, next) => {
    res.send('base url: /api');
});

let server = null;

async function listen(port) {
    try {
        if (server) {
            return server;
        }

        server = await app.listen(port);
        return server;
    } catch (e) {
        console.error("Can't listen", e);
        throw e;
    }
}

async function close() {
    if (server) {
        await server.close();
        server = null;
    } else {
        console.error("Can't close a non started server");
    }
}

module.exports = {
    listen,
    close,
};
