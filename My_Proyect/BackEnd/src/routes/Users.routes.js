//Usamos una funcion que nos brinda express llamada router que nos permite enrutar cada crud

const {Router}=require('express')

const router=Router();

const {Ingresar}=require("../controllers/usuarios.controllers")
const {route}=require("../config/app")

router.post('/Ingresar',Ingresar);

module.exports=router