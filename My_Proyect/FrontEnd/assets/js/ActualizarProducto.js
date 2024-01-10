'use strict';

// Traer Campos
const ContainerImg=document.querySelector(".previewImagenn");
const Nombre=document.getElementById("Nombre");
const Id=document.getElementById("Id");
const Descripcion=document.getElementById("Descripcion");

// Entonces lo que hago aqui es añadir un evento para cuando cargue el DOM
// Este evento ejecuta una funcion asincrona que lo que hara es definir una constante 
// y apartartir de ella definir una constante que permitira realizar un tipo de peticion a un controlador
// usando el enpoint o ruta del mismo  
document.addEventListener("DOMContentLoaded", async(e)=>{
    const response=await fetch('http://127.0.0.1:3000/producto/TraerDatos',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify({confirmacion:true}),
    }).then((response)=>response.json()).then((data)=>{
        //Aqui hacemos promesas, la primera dice que abra una respuesta para esta peticion
        //y que la respuesta de esta peticion sera de tipo json
        // aparte de esto la otra promesa nos dice que la respuesta tendra una data
        let valor=data
        console.log(valor)
        // Creamos una variable que guardara la data de la respuesta 
        mostrarpreview(valor.Image)
        // LLamamos a la funcion mostrarPreview y enviamos la imagen
        Nombre.value=valor.Nombr 
        Descripcion.value=valor.Descrip
        Id.value=valor.Id_Produ
        // Usamos los elementos globales para utilizar las variables y los valores que tendran
        console.log(valor.Id_Producto)
        console.log("Trajo los elementos");
    })
})




//Traer elementos para el file preview
let boton=document.getElementById("select")
boton.addEventListener("click", ()=>{
    widget()    
    // Añadimos un evento click para le boton que llamara la funcion widget
})
// Elemento que contendra la informacion que entra

var NombreFile=""
function getImage(){
    return NombreFile
}

function widget(){
    //Esta funcion utilizando herramientas externas cen este caso claudinary y
    // Un widget que permite subir imagenes directo 
    let widget_cloudinary= cloudinary.createUploadWidget({
        // Aqui creamos una variable que lo que hara es usar 
        //una funcion de cloudinary que me permite crear un widget
        cloudName:'dskllufl9',
        uploadPreset:'h933ycki'
        // Estas son la claves de acceso para cloudinary 
    }, (err,result)=>{
        if(!err && result && result.event==="success"){
            NombreFile=result.info.secure_url
            getImage()
            //Este evalua errores, y resultados, Toma el Nombre del archivo y lo guarda en una variable global
            // Actualizando su valor 
        }
        mostrarpreview(NombreFile)
        // Despues de esto llama a motrar preview que se encargara de tomar el Nombre del archivo y subirlo 
    })
    widget_cloudinary.open();
}
// Esta funcion abre el widget

//Mostrar Preview
function mostrarpreview(URL){
    console.log(URL)
    //Ojo a esta parte eh?
    if (URL) {
        // Si url esta definido creara una imagen alternativa y la mostrara 
        let h1=document.getElementById("h1img")
        let Div=document.querySelector(".previewImagenn")
        Div.innerHTML=`<img src="${URL}" alt="">`
        h1.style.top=0
        NombreFile=URL;
        getImage()
    } else {
        // Limpiar la vista previa si no se selecciona ningún archivo
        let div=document.querySelector(".previewImagenn")
        div.innerHTML = "";
    }
}

// Actualizar Producto

const formulario=document.getElementById("form");

//Primero traemos al formulario del DOM
//añadimos un evento listener que me escuche cuando se envie el formulario y este a su vez
// activa la funcion asincrona 

formulario.addEventListener("submit", async(e)=>{
    // este evita que se realizen las acciones normales para un formulario en este evento
    e.preventDefault()
    //Hacemos un try y un catch para intentar hacer ciertas acciones 
    try{
        //verifica que este lleno los campos que necesitamos para actualizar el producto 
        if ( getImage()!==undefined && getImage()!==null && Nombre.value !== null && Descripcion.value !== null && Nombre.value !== undefined && Descripcion.value !== undefined ){
            //Realiza la solicitud fetch de actualizar definiendo promesas y enviando parametros del body
            const response=await fetch ('http://127.0.0.1:3000/producto/ActualizarP',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({id:Id.value, Nombr:Nombre.value, Descripcio:Descripcion.value, Image:getImage()}),
            }).then((response)=>response.json()).then((data)=>{
                //Espera la respuesta del controlador y la guarda en la variable valor
                let valor=data.message
                // Aqui se guarda el mensaje del objeto data que proviene del controlador
                if(valor=="Producto Actualizado"){
                    //Valida el mensaje y redirige 
                    alert("El producto fue actualizado correctamente");
                    window.location.href='./ConsultaPG.html'
                }
                else{
                    console.log("Algo fallo al actualizar el producto")
                }
            })
        }
        else{
            console.log("Algun dato esta vacio");
        }
    }
    catch(err){
        //Acciones por si el try falla
        console.log("Algo fallo al hacer la solicitud fetch",err)
    }
})
