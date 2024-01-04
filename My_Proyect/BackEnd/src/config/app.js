const express=require('express');
const cors=require('cors');
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
//Para exportar 
module.exports=app
//enpoints, que son como las rutas que identifican cada tarea
const productosRoute=require('../routes/productos.routes');
const UserRoutes=require("../routes/Users.routes");
//creamos un enpoint para identificar las funciones de solo el usuario empleando la constante app
app.use('/producto',productosRoute); 
app.use('/users',UserRoutes);


