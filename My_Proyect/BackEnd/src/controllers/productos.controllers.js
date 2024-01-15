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
        const Squery= `select * from Producto where Estado="Activo";`
        const Exquery=mysql2.format(Squery)
        database.query(Exquery, (err, result)=>{
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
function ConsultarProductosI(req, res){
  const {confirmacion}=req.body
   try{
       if(confirmacion==true){
        const Squery= `select * from Producto where Estado="Inactivo";`
        const Exquery=mysql2.format(Squery)
        database.query(Exquery, (err, result)=>{
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

let DatosP={
  Id_Produ:"",
  Image:"",
  Nombr:"",
  Descrip:"",
}
function getDATOS(){
  return DatosP
}


function TomarDatos(req, res){
  const {id}=req.body;
  try{
    const Squery=`select * from Producto where Id_Producto=${id};`;
    const Exquery=mysql2.format(Squery);
    database.query(Exquery,(err, result)=>{
      let Producto=result[0];
      DatosP.Id_Produ=Producto.Id_Producto
      DatosP.Image=Producto.Imagen
      DatosP.Nombr=Producto.Nombre
      DatosP.Descrip=Producto.Descripcion
      getDATOS()
      res.json({message:"Se leyo"})
    })
  }
  catch(err){
    console.log("Algo paso al leer Producto",err)
  }
}

function EliminarP(req, res){
  const {id}=req.body
  try{
    const Squery=`update Producto set Estado="Inactivo" where Id_Producto=${id};`
    const Exquery=mysql2.format(Squery)
    database.query(Exquery,(err)=>{
      if (err)throw err
      else{
        res.json({message:"Producto Eliminado"});
      }
    })
  }
  catch(err){
    console.log("No se pudo ejecutar el query", err)
  }
}

function ActivarP(req, res){
  const {id}=req.body
  try{
    const Squery=`update Producto set Estado="Activo" where Id_Producto=${id};`
    const Exquery=mysql2.format(Squery)
    database.query(Exquery,(err)=>{
      if (err)throw err
      else{
        res.json({message:"Producto Activado"});
      }
    })
  }
  catch(err){
    console.log("No se pudo ejecutar el query", err)
  }
}

function ActualizarP(req, res){
  const {id, Nombr, Descripcio, Image}=req.body
  try{
    const Squery=`update Producto set Nombre='${Nombr}', Descripcion='${Descripcio}', Imagen='${Image}' where Id_Producto=${id};`
    const Exquery=mysql2.format(Squery)
    database.query(Exquery,(err)=>{
      if (err)throw err
      else{
        res.json({message:"Producto Actualizado"});
      }
    })
  }
  catch(err){
    console.log("No se pudo ejecutar el query", err)
  }
}

function EnviarDatos(req,res){
  const{confirmacion}=req.body
  try{
    if (confirmacion==true){
      let Array=getDATOS()
      res.send(Array)
    }
    else{
      res.send("No se pudo enviar objeto algo pasa")
    }
  }
  catch(err){
    console.log("No se pudo devolver objeto",err)
  }
}

function ConsultaBarraBus(req, res){
  const {valorBusqueda}=req.body
  try{ 
    const Squery=`select * from Producto where Nombre like '%${valorBusqueda}%';`
    const Exquery=mysql2.format(Squery);
    database.query(Exquery, (err, result)=>{
      if (err) throw err
      else{
        let producto= result;
        if(result.length > 0){
          res.json({message:producto});
        }
        else{
          res.json({message:"No hay coincidencias"})
        }
      }
    })
  }
  catch(err){
    console.log("No se pudo contactar o ejecutar en la BD", err)
  }

}
module.exports={
  anadirProductoNuevo,
  consultarProductos,
  ConsultarProductosI,
  ActivarP,
  EliminarP,
  TomarDatos,
  EnviarDatos,
  ActualizarP,
  ConsultaBarraBus
}