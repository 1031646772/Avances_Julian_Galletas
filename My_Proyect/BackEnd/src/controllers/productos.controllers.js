const { query } = require('express');
const database=require('../config/database')
const mysql2=require ('mysql2');
// Funcion para Registrar producto nuevo
function anadirProductoNuevo(req,res){
  const {imagen,nombre,descripcion}=req.body
  try{
       const Squery=`
       insert into Producto (Imagen, Nombre, Descripcion) 
       values('${imagen}','${nombre}','${descripcion}');`
        const Exquery= mysql2.format(Squery)
        database.query(Exquery, (err, result)=>{
          if (err) throw err
          else{
            res.json({message:"Producto Creado"})
          }
        })
  }
  catch(Err){
       console.log("No se pudo ejecutar query", Err)
  }
}

function consultarProductos(req,res){
   const {confirmacion}=req.body
   try{
       if(confirmacion==true){
        const Squery= `select Imagen, Nombre, Descripcion from Producto;`
        const Exquery=mysql2.format(Squery)
        database.query(Squery, (err, result)=>{
          if (err)throw err
          else if(result !== undefined){
             res.send(result)
          }
        })
       }
   }
   catch(Err){
       console.log("Error al hacer la insercion", Err);
   }
}


module.exports={
  anadirProductoNuevo,
  consultarProductos
}