const { query } = require('express');
const database=require('../config/database')
const mysql2=require ('mysql2');

let objeto={
    Nombre:"",
    Email:"",
    Contrasena:"",
    Token:0
}

function getObjeto(){
    return objeto
}

function Ingresar(req, res){
    const {User, Contrasena}=req.body
    try{
        const Squery=`select * from User where Email='${User}' and Contrasena='${Contrasena}';`;
        const Exquery=mysql2.format(Squery)
        database.query(Exquery, (err, result)=>{
            if (err) throw err
            else{
                if (result[0] !==undefined){
                    res.json({message:"Usuario encontrado"});
                }
                else{
                    res.json({message:"Usuario no encontrado"})
                }
            }
        })
    }
    catch(err){
        console.log("Error al ejecutar query", err)
    }
}

function GenerarTokenIniciosesion(req, res){
    try{
        const {Usuario}=req.body
        console.log(Usuario)
        const Squery=`select Id_user,Nombre,Email,Contrasena from User where Email='${Usuario}';`
        const Exquery=mysql2.format(Squery)
        database.query(Exquery,(err,result)=>{
            console.log(result)
            if (result && result [0] !=undefined && result[0]!=null){
                crearToken(result[0])
                if(objeto.Token !=0 && objeto.Token.toString().length==6){
                    res.json({message:"Se obtuvo el token correctamente"})
                }
                else{
                    res.json({message:"El token probablemente no se genero"})
                    }
            }
            else{
                console.log("los datos de la consulta pueden estar vacios")
            }
        })
    }
    catch(err){
        console.log("hubo un error en el proceso de la solicitud fetch", err)
    }

}

function crearToken(datosUsuario){
    let token = Math.floor(Math.random() * 900000) + 100000;

    objeto.Nombre=datosUsuario.Nombre,
    objeto.Email=datosUsuario.Email,
    objeto.Contrasena=datosUsuario.Contrasena,
    objeto.Token=token
    getObjeto()
}

function TraerToken(req, res){
    const {confirmacion}=req.body
    try{
        console.log(confirmacion)
        console.log(objeto.Token)
        if (confirmacion==true && objeto.Token!=0){
            res.json({message:objeto})
        }
        else{
            res.json({message:"El token o la confirmacion estan fallando"})
        }
    }
    catch(err){
        console.log("Algo paso al enviar el token", err)
    }
}

function cerrarSesion(req,res){
    const {confirm}=req.body;
    try{
        if (confirm==true){
            objeto.Nombre="",
            objeto.Email="",
            objeto.Contrasena="",
            objeto.Token=0,
            getObjeto()
            res.json({message:"Se cerro Sesion"});
        }
        else{
            res.json({message:"Algo fallo al limpiar el usuario"})
        }
    }
    catch(err){
        console.log("Algo fallo al limpiar el objeto token del usuario", err);    
    }
}


module.exports={
    Ingresar,
    GenerarTokenIniciosesion,
    TraerToken,
    cerrarSesion
}

