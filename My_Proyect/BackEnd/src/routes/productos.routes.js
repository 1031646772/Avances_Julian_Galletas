//Usamos una funcion que nos brinda express llamada router que nos permite enrutar cada crud

const {Router}=require('express')

const router=Router();

//Tomando lo que se exporto de user.controller para usarlo
const {anadirProductoNuevo,consultarProductos,EliminarP,TomarDatos,EnviarDatos,ActualizarP,ConsultaBarraBus,ActivarP,ConsultarProductosI}=require('../controllers/productos.controllers');
const { route } = require('../config/app');


router.post('/CrearProducto',anadirProductoNuevo);
router.post('/ConsultarProducto',consultarProductos);
router.post('/ConsultarIProducto',ConsultarProductosI);
router.post('/EliminarProducto',EliminarP);
router.post('/LeerProducto',TomarDatos);
router.post('/TraerDatos',EnviarDatos);
router.post('/ActualizarP',ActualizarP);
router.post('/ActivarProducto',ActivarP);
router.post('/ConsultarBarra',ConsultaBarraBus);

//Lo exportamos para usarlo en app.js
module.exports=router