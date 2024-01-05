'use strict';

// Traer Campos
const ContainerImg=document.querySelector(".previewImagenn");
const Nombre=document.getElementById("Nombre");
const Id=document.getElementById("Id");
const Descripcion=document.getElementById("Descripcion");


document.addEventListener("DOMContentLoaded", async(e)=>{
    const response=await fetch('http://127.0.0.1:3000/producto/TraerDatos',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify({confirmacion:true}),
    }).then((response)=>response.json()).then((data)=>{
        let valor=data
        console.log(valor)
        mostrarpreview(valor.Image)
        Nombre.value=valor.Nombr
        Descripcion.value=valor.Descrip
        Id.value=valor.Id_Produ
        console.log(valor.Id_Producto)
        console.log("Trajo los elementos");
    })
})




//Traer elementos para el file preview
let boton=document.getElementById("select")
boton.addEventListener("click", ()=>{
    widget()    
})
// Elemento que contendra la informacion que entra

var NombreFile=""
function getImage(){
    return NombreFile
}

function widget(){
    let widget_cloudinary= cloudinary.createUploadWidget({
        cloudName:'dskllufl9',
        uploadPreset:'h933ycki'
    }, (err,result)=>{
        if(!err && result && result.event==="success"){
            NombreFile=result.info.secure_url
            getImage()
        }
        mostrarpreview(NombreFile)
    })
    widget_cloudinary.open();
}

//Mostrar Preview
function mostrarpreview(URL){
    console.log(URL)
    //Ojo a esta parte eh?
    if (URL) {
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

formulario.addEventListener("submit", async(e)=>{
    e.preventDefault()
    try{
        if ( getImage()!==undefined && getImage()!==null && Nombre.value !== null && Descripcion.value !== null && Nombre.value !== undefined && Descripcion.value !== undefined ){
            const response=await fetch ('http://127.0.0.1:3000/producto/ActualizarP',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({id:Id.value, Nombr:Nombre.value, Descripcio:Descripcion.value, Image:getImage()}),
            }).then((response)=>response.json()).then((data)=>{
                let valor=data.message
                if(valor=="Producto Actualizado"){
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
        console.log("Algo fallo al hacer la solicitud fetch",err)
    }
})
