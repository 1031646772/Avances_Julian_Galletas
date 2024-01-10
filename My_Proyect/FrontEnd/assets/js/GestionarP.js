// Traemos elementos del dom
const boton1= document.getElementById("boton1");
const boton2= document.getElementById("boton2");
// Traemos lo que son los botones
// de registrar productos y gestionar prodcutos 
// Se crea un evento para cuando le den click que redireccionara a una interfaz
boton1.addEventListener("click", ()=>{
    window.location.href="./RegistrarProducto.html"
})
// Sy de iguale forma se crea un evento para cuando le den click que redireccionara a una interfaz
boton2.addEventListener("click", ()=>{
    window.location.href="./ConsultaPG.html"
})


