// Trayendo elementos del DOM
const boton_menu=document.getElementById("hamburguesa");
const boton_cerrar=document.getElementById("cerrarMenu");
const menu=document.getElementById("menu_emer");

boton_menu.addEventListener("click", ()=>{
    menu.style.display="block"
})

boton_cerrar.addEventListener("click", () => {
    menu.style.animation = 'Menu2 2s ease-in-out';
    // Agrega un escuchador para el evento 'animationend'
    menu.addEventListener("animationend", () => {
        menu.style.display = "none";
    }, { once: true }); // La opción { once: true } asegura que el escuchador se elimine después de su primera ejecución
});
