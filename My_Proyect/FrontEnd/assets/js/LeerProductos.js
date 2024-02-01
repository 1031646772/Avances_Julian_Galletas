// Traer objetos DOM
const container_productos=document.getElementById("ProductosN");
// Este trae el contenedor de lo que seran los productos 
let arreglo_Objetos=""
function getArreglo(){
    return arreglo_Objetos
}
//Este arreglo servira para iterar y guardar los elementos 
// Leer nuevos productos
function leerProductos(){
    //Este contador tendra una funcion importante
    // lo que hara es que le dara un estilo para los pares y otro a los impares 
    contadorr=1
    let nuevoDIV=""
    // Creamos el div que tendra la estructura de todas las cards
    arreglo_Objetos.forEach(function (item){
        // Recorremos el arreglo de objetos iterando bajo una funcion
        // item es practicamente cada producto en forma de objeto
        item.contador=contadorr
        contadorr++
        // Aumentamos cada vez que se lea un producto el contador para que cada uno quede con un estilo de impares y otros de pares
        console.log(contadorr)
        // Aqui bajo modular aplicamos en nuevo div la nueva estructura validando que estilo tendra
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
    // Finalmente cargara el div completo en el contenedor de productos 
}


// Ejecute la funcion cada vez que cargue la pagina
// Traemos bajo una solicitud fetch los productos
// Esto usando una funcion asincrona que se activa cuando el DOM cargue
document.addEventListener("DOMContentLoaded", async(e)=>{
    // Usamos un try y un catch
    try{
        const response=await fetch("http://127.0.0.1:3000/producto/ConsultarProducto",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({confirmacion:true}),
        }).then((response)=> response.json()).then((data)=>{
            // Evaluamos lo que son las promesas que tendran y decimos que con esto
            //data guarda todos los productos como objetos 
            arreglo_Objetos=data
            //Dentro de arreglos guardamos esta informacion y lo actualizamos como objeto global
            getArreglo()
            let mensajito=document.getElementById("messageC");
            console.log(arreglo_Objetos)
            if(arreglo_Objetos.length > 0){
                leerProductos()
                leerProductosMobile()
                CrearModal()
                anadirEventos()
                EventoContactenos()
                añadirEventosBotonCon()
                mensajito.style.display="none"
                //llamamos las funciones que utilizaran este arreglo 
                // y ya no mostraremos el mensaje
            }
            else{
                //si el arreglo no tiene objetos mostrara el mensajito
                mensajito.style.display="block"
            }
        })
    }
    catch(err){
        console.error("Error en la solicitud fetch:", err);
        //si el arreglo no tiene objetos mostrara el mensajito
        let mensajito=document.getElementById("messageC");
        mensajito.style.display="block"
    }
});



//Crear elementos en mobile
// Traer el contenedor de productos
const container_productos2=document.getElementById("productos-resM");

// Esta funcion lee los productos para el mobile 
function leerProductosMobile(){
    // Segun el nuevo div que sera para las cards de los productos en mobile
    let nuevoDIV=""
    let contadorr = 1
    // Bajo la misma logica anterior recorremos el arreglo de objetos bajo una funcion
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
    //Esta funcion crea una modal por cada card que tiene un contador por ello se lee 
    indice=1
    let nuevoDIV=""
    // se hace bajo el arreglo de objetos y un iterador
    arreglo_Objetos.forEach(function (item){
        nuevoDIV += `
        <div class="container-oculto" id="modal${indice}">
            <button class="boton-cerrar-modal" id="cerrar-pro${indice}">X</button>
            <h1 class="title-container">Producto</h1>
            <div class="card-desc">
                <img src="${item.Imagen}" alt="">
                <div class="text-desc">
                    <h1>${item.Nombre}</h1>
                    <div class="containers-p">
                    <p>${item.Descripcion}</p>
                    </div>
                    <button class="productoContac">Contactanos</button>
                </div>
            </div>
        </div>
        `
        indice++
    })
    container_modals.innerHTML=nuevoDIV
}

function anadirEventos() {
    let indice = 1;
    arreglo_Objetos.forEach(function (item) {
        const card = document.getElementById("cardP" + indice);
        let container = document.getElementById("modal" + indice);
        let botonCerrar = document.getElementById("cerrar-pro" + indice);
        var container_productosnuevos = document.getElementById("productos-resM");
        var body = document.body;

        card.addEventListener("click", () => {
            container.style.display = "block";
            body.style.overflow = 'hidden';
        });

        botonCerrar.addEventListener("click", () => {
            container.style.display = "none";
            body.style.overflow = 'auto';
        });

        indice++;
    });

    añadirAnimacion();
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

function añadirEventosBotonCon(){
    const botonContacta=document.querySelectorAll(".productoContac");
    botonContacta.forEach(function (item){
        item.addEventListener("click", function(){
            window.location.href="RegistrarProducto.html"
        })
    })
}