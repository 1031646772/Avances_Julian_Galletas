// Traer elementos del dom

const ContainerProductos=document.getElementById("ProductosN")
const ContainerProductosInact=document.getElementById("ProductosI")

document.addEventListener("DOMContentLoaded", async (e)=>{
    const renponse= await fetch('http://127.0.0.1:3000/producto/ConsultarProducto',{
        method:"POST",
        headers:{
            'Content-Type': "application/json",
        },
        body: JSON.stringify({confirmacion:true}),
    }).then((response)=>response.json()).then((data)=>{
        let Productos=data;
        if(Productos.length > 0){
            leerP(Productos)
            let mensaje=document.getElementById("messageC")
            mensaje.style.display="none"
        }
        else{
            console.log("No tiene nada")
            let mensaje=document.getElementById("messageC")
            mensaje.style.display="block"
        }
    })

    const renpons= await fetch('http://127.0.0.1:3000/producto/ConsultarIProducto',{
        method:"POST",
        headers:{
            'Content-Type': "application/json",
        },
        body: JSON.stringify({confirmacion:true}),
    }).then((response)=>response.json()).then((data)=>{
        let Productos=data;
        if(Productos.length > 0){
            leerPi(Productos)
            let mensaje=document.getElementById("messageCi")
            mensaje.style.display="none"
        }
        else{
            console.log("No tiene nada")
            let mensaje=document.getElementById("messageCi")
            mensaje.style.display="block"
        }
    })
})

function leerP(ArregloJson){
    let nuevoDiv=""
    ArregloJson.forEach(function (item){
        nuevoDiv +=`
        <div class="card">
                <img src="${item.Imagen}" alt="">
                <h1>${item.Nombre}</h1>
                <div class="containerButton">
                    <button onclick="TomarDatos(${item.Id_Producto})">Actualizar</button>
                    <button onclick="EliminarProducto(${item.Id_Producto})">Eliminar</button>
                </div>
            </div>
        `
    })
    ContainerProductos.innerHTML=nuevoDiv
}

function leerPi(ArregloJson){
    let nuevoDiv=""
    ArregloJson.forEach(function (item){
        nuevoDiv +=`
        <div class="card">
                <img src="${item.Imagen}" alt="">
                <h1>${item.Nombre}</h1>
                <div class="containerButton">
                    <button onclick="ActivarProducto(${item.Id_Producto})">Activar</button>
                </div>
            </div>
        `
    })
    ContainerProductosInact.innerHTML=nuevoDiv
}

async function TomarDatos(Id_Producto){
    if(Id_Producto !== null && Id_Producto !==undefined ){
        try{
            const response=await fetch('http://127.0.0.1:3000/producto/LeerProducto',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({id:Id_Producto}),
            }).then((response)=>response.json()).then((data)=>{
                let valor=data.message;
                if(valor==="Se leyo"){
                    console.log("Se leyo Producto Exitosamente");
                    window.location.href='./ActualizarProducto.html';
                }
                else{
                    console.log("Algo fallo al actualizar")
                }
            })
        }
        catch(err){
            console.log("Error al hacer la solictud fetch", err)
        } 
    }    
    else{
        console.log("No esta llegando ni verga")
    }
}

async function EliminarProducto(Id_Producto){
    if(Id_Producto !== null && Id_Producto !==undefined){
        try{
            const response=await fetch('http://127.0.0.1:3000/producto/EliminarProducto',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({id:Id_Producto}),
            }).then((response)=> response.json()).then((data)=>{
                let valor=data.message
                if(valor==="Producto Eliminado"){
                    alert("El producto fue eliminado correctamente");
                    location.reload();
                }
                else{
                    console.log("No se elimino el producto");
                }
            })
        }
        catch(err){
            console.log("Hubo un error al hacer la solicitud fetch",err)
        }
    }
    else{
        console.log("No esta llegando el id, o esta nulo")
    }
}

async function ActivarProducto(Id_Producto){
    if(Id_Producto !== null && Id_Producto !==undefined){
        try{
            const response=await fetch('http://127.0.0.1:3000/producto/ActivarProducto',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({id:Id_Producto}),
            }).then((response)=> response.json()).then((data)=>{
                let valor=data.message
                if(valor==="Producto Activado"){
                    alert("El producto fue activado correctamente");
                    location.reload();
                }
                else{
                    console.log("No se elimino el producto");
                }
            })
        }
        catch(err){
            console.log("Un error al hacer la solicitud fetch",err)
        }
    }
    else{
        console.log("No esta llegando el id, o esta nulo")
    }
}