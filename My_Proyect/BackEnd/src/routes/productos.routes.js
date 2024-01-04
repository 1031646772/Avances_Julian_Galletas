//Usamos una funcion que nos brinda express llamada router que nos permite enrutar cada crud

const {Router}=require('express')

const router=Router();

//Tomando lo que se exporto de user.controller para usarlo
const {anadirProductoNuevo,consultarProductos}=require('../controllers/productos.controllers');
const { route } = require('../config/app');


router.post('/CrearProducto',anadirProductoNuevo);
router.post('/ConsultarProducto',consultarProductos);

//Lo exportamos para usarlo en app.js
module.exports=router