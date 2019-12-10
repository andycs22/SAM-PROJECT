'use strict';

//Seguid escribiendo las rutas aquí, y creando los archivos correspondientes. En esta parte escribid solo las rutas, la funcionalidad estará en la carpeta 'controllers'
const editProfile = require('./editProfile-router');
const ordersHistory = require('./ordersHistory-router');
const shoppingCart = require('./ShoppingCart-router');

//Para cada ruta falta el "CheckUser", comprobar que el usuario existe, vamos. No lo he puesto, porque espero a que se ponga. Falta en los que los necesiten, en los míos sí, por ejemplo.
module.exports = {
    editProfile,
    ordersHistory,
    shoppingCart,
};