// Traer elemento del DOM
const containerIcons = document.querySelector(".Cargando");
// Añadimos un evento que se ejecuta cuando el dom carga que es de quitar la carga
// En este caso despues de 2 segundos quita el contenedor de animacion
document.addEventListener("DOMContentLoaded", function () {
    setInterval(quitarCarga, 2000);
});

function quitarCarga() {
    containerIcons.style.display = "none";
}
