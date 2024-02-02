//Usamos una funcion que nos brinda express llamada router que nos permite enrutar cada crud

const {Router}=require('express')

const router=Router();

const {Ingresar,TraerToken,GenerarTokenIniciosesion}=require("../controllers/usuarios.controllers")
const {route}=require("../config/app")

router.post('/Ingresar',Ingresar);
router.post('/CrearToken',GenerarTokenIniciosesion);
router.post('/TraerToken',TraerToken);

module.exports=router