// Trayendo elementos del DOM
const boton_menu=document.getElementById("hamburguesa");
const boton_cerrar=document.getElementById("cerrarMenu");
const menu=document.getElementById("menu_emer");

boton_menu.addEventListener("click", () => {
    // Aplica la animación 'Menu' al abrir el modal
    menu.style.animation = 'Menu 1s ease-in-out';
    menu.style.display="flex"
    body.style.overflow = "hidden";
});

boton_cerrar.addEventListener("click", () => {
    // Agrega la animación 'Menu2' al cerrar el modal
    menu.style.animation = 'Menu2 1s ease-in-out';
    // Agrega un escuchador para el evento 'animationend'
    menu.addEventListener("animationend", quitacionAnimacion, { once: true });
});

function quitacionAnimacion(){
    menu.style.display="none"
}

