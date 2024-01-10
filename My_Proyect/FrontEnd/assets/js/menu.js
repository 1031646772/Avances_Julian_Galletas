// Trayendo elementos del DOM
const boton_menu=document.getElementById("hamburguesa");
const boton_cerrar=document.getElementById("cerrarMenu");
const menu=document.getElementById("menu_emer");
// Se traen las partes del menu
boton_menu.addEventListener("click", ()=>{
// se añade evento al boton que cuando le dan click lo muestra
    menu.style.display="block"
})

boton_cerrar.addEventListener("click", () => {
    //Añadimos eventos para el boton de cerrar, de igual forma cuando le den click
    //Aqui cambia el estilo del menu añadiendole la animacion de Menu2 para que desaparezca
    menu.style.animation = 'Menu2 2s ease-in-out';
    // Agrega un escuchador para el evento 'animationend'
    menu.addEventListener("animationend", () => {
        menu.style.display = "none";
    }, { once: true }); // La opción { once: true } asegura que el escuchador se elimine después de su primera ejecución
});
