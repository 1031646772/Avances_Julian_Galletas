const { query } = require('express');
const database=require('../config/database')
const mysql2=require ('mysql2');

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

module.exports={
    Ingresar
}