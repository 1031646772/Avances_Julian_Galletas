// Traer elementos del dom

const ContainerProductos=document.getElementById("ProductosN")
const ContainerProductosInact=document.getElementById("ProductosI")

//traemos lo contenedores de productos tanto activos como inactivos 

//Cuando el DOM carga ejecuta un evento listener que lo que hara es realizar una solicitud fetch
// por medio de una funcion asincrona esperando una respuesta de por medio

document.addEventListener("DOMContentLoaded", async (e)=>{
    //El enpoint que vemos abajo tiene que como fin realizar una consulta en la base de datos para devolver lo que son los productos activos 
    const renponse= await fetch('http://127.0.0.1:3000/producto/ConsultarProducto',{
        method:"POST",
        headers:{
            'Content-Type': "application/json",
        },
        body: JSON.stringify({confirmacion:true}),
    }).then((response)=>response.json()).then((data)=>{
        // Esta consulta por medio de una solicitud tiene una respuesta con una data por eso
        // en la linea anterior lo que se hace es establecer promesas
        let Productos=data;
        // Productos es igual a esa data en este caso lo que seria los objetos (cada objeto es un producto)
        if(Productos.length > 0){
            // Se valida que productos tengan valores y aparte de esto si no esta vacio se llama la funcion leerP
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
    // Esta porcion de codigo cumple la funcion anterior solo que trae los productos inactivos
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


//Aqui definimos la funcion que se encargara de leer los objetos 
function leerP(ArregloJson){
    let nuevoDiv=""
    // Se crea un div que almacenaran los productos activos 
    // se recorren con un forEach en funcion de item 
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
    //Creando en cada iteracion de cada producto un div con la informacion
    //y dos botones que se encargaran de ejecutar 2 tareas 
    // 1 actualizar este producto 
    // 2 eliminarlo (inactivarlo) 
    ContainerProductos.innerHTML=nuevoDiv
    // finalmente en el contenedor hacemos un inner para crear dentro del div el nuevo div con los elementos de los productos
}
 // Cumple la misma funcion anterior solo que son los productos inactivos
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

// Esta funcion es la que tiene el boton de actualizar el cual 
// cuple una funcion importante  al leer a nivel de servidor los datos de este producto temporalmente
// Al igual que las demas se hace por medio de peticiones fetch 
// funcion asincrona
async function TomarDatos(Id_Producto){
    // Como recibe de parametro el Id del producto para realizar la operacion 
    // Validamos que no este vacio 
    if(Id_Producto !== null && Id_Producto !==undefined ){
        // Luego usamos un try y un catch para hacer la peticion validando errores
        try{
            const response=await fetch('http://127.0.0.1:3000/producto/LeerProducto',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({id:Id_Producto}),
            }).then((response)=>response.json()).then((data)=>{
                // Evalua las promesas y de que tipo seran en este caso seran json y tendran una data
                // Devuelve un mensaje sobre la peticion en formato json
                let valor=data.message;
                // Guardamos en la variable valor y validamos que accion realizaremos 
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
            //instrucciones en caso de que no se pueda realizar la solicitud fetch
            console.log("Error al hacer la solictud fetch", err)
        } 
    }    
    else{
        console.log("No esta llegando ni verga")
    }
}

//ELiminar Producto proviene del otro boton
//Definimos la funcion 
//El Id de producto entra como parametro
async function EliminarProducto(Id_Producto){
    //Validamos que el Id no venga nulo o vacio
    if(Id_Producto !== null && Id_Producto !==undefined){
        // Usamos el try y el catch 
        try{
            const response=await fetch('http://127.0.0.1:3000/producto/EliminarProducto',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({id:Id_Producto}),
            }).then((response)=> response.json()).then((data)=>{
                // Validamos las promesas, su formato y su data 
                // Como tiene una respuesta en formato json
                //Se guarda la respuesta en la variable valor 
                let valor=data.message
                // Se valida su contenido y tiene acciones dependiendo de lo que tenga
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
// La misma funcion de eliminar pero realza la operacion contraria (Activar)
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