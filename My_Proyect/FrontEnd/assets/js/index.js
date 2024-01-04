// Traer objetos DOM
const container_productos=document.getElementById("ProductosN");
let arreglo_Objetos=""
function getArreglo(){
    return arreglo_Objetos
}
// Leer nuevos productos
function leerProductos(){
    contadorr=1
    let nuevoDIV=""
    arreglo_Objetos.forEach(function (item){
        item.contador=contadorr
        contadorr++
        console.log(contadorr)
        if ((item.contador % 2 )===0){
            nuevoDIV +=`
            <div class="card">
                <img src="${item.Imagen}" alt="">
                <div class="Texto-card">
                    <h1>${item.Nombre}</h1>
                    <p>${item.Descripcion}</p>
                </div>
            </div>
            `
        }
        else{
            nuevoDIV +=`
            <div class="card2">
                <div class="Texto-card">
                    <h1>${item.Nombre}</h1>
                    <p>${item.Descripcion}</p>
                </div>
                <img src="${item.Imagen}" alt="">
            </div>
            `
        }
    })
    container_productos.innerHTML=nuevoDIV 
}


// Ejecute la funcion cada vez que cargue la pagina
document.addEventListener("DOMContentLoaded", async(e)=>{
    try{
        const response=await fetch("http://127.0.0.1:3000/producto/ConsultarProducto",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({confirmacion:true}),
        }).then((response)=> response.json()).then((data)=>{
            arreglo_Objetos=data
            getArreglo()
            let mensajito=document.getElementById("messageC");
            console.log(arreglo_Objetos)
            if(arreglo_Objetos.length > 0){
                leerProductos()
                leerProductosMobile()
                CrearModal()
                anadirEventos()
                EventoContactenos()
                mensajito.style.display="none"
            }
            else{
                mensajito.style.display="block"
            }
        })
    }
    catch(err){
        console.error("Error en la solicitud fetch:", error);
    }
});



//Crear elementos en mobile
// Traer el contenedor de productos
const container_productos2=document.getElementById("productos-resM");

function leerProductosMobile(){
    let nuevoDIV
    let contadorr = 1
    arreglo_Objetos.forEach(function (item){
        console.log(item.Imagen)
        nuevoDIV += `
        <div class="card-res2" id="cardP${contadorr}">
            <img src="${item.Imagen}" alt="">
            <h1>${item.Nombre}</h1>
        </div>
        `
        container_productos2.innerHTML=nuevoDIV
        contadorr++
    })
}

//Contenedor modales
const container_modals=document.getElementById("containerModals")
function CrearModal(){
    indice=1
    let nuevoDIV
    arreglo_Objetos.forEach(function (item){
        nuevoDIV += `
        <div class="container-oculto" id="modal${indice}">
            <button class="boton-cerrar-modal" id="cerrar-pro${indice}">X</button>
            <h1 class="title-container">Producto</h1>
            <div class="card-desc">
                <img src="${item.Imagen}" alt="">
                <div class="text-desc">
                    <h1>${item.Nombre}</h1>
                    <p>${item.Descripcion}</p>
                </div>
            </div>
        </div>
        `
        indice++
    })
    container_modals.innerHTML=nuevoDIV
}

function anadirEventos(){
    let indice=1
    arreglo_Objetos.forEach(function (item){
        const card=document.getElementById("cardP"+indice)
        let container=document.getElementById("modal"+indice)
        let botonCerrar=document.getElementById("cerrar-pro"+indice)
        var container_productosnuevos= document.getElementById("productos-resM");
        var body=document.body
        card.addEventListener("click", ()=>{
            container.style.display="block"
            body.style.overflow = 'hidden';
        })
        botonCerrar.addEventListener("click", ()=>{
            container.style.display="none"
            body.style.overflow = 'auto';
        })
        indice++
    })
    añadirAnimacion()
}
function añadirAnimacion(){
    containerCard=document.querySelectorAll(".card-desc")
    containerCard.forEach(function (item){
        item.style.animation = 'Menu 0.7s ease-in-out';
    })
}

//Modal de contactactanos 

let containerModalCon=document.getElementById("modalcon");
function EventoContactenos(){
    let card1=document.querySelectorAll(".card")
    let card2=document.querySelectorAll(".card2")
    let body=document.body
    card1.forEach(function (item){
        item.addEventListener("click",()=>{
            containerModalCon.style.display="flex"
            body.style.overflow="hidden"
        })
    })
    card2.forEach(function (item){
        item.addEventListener("click",()=>{
            containerModalCon.style.display="flex"
            body.style.overflow="hidden"
        })
    })
    let botonCerrar=document.getElementById("cerrarC")
    botonCerrar.addEventListener("click",()=>{
        containerModalCon.style.display="none"
        body.style.overflow="auto"
    })
}

