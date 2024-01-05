// Traer elemento del DOM
const containerIcons = document.querySelector(".Cargando");

document.addEventListener("DOMContentLoaded", function () {
    setInterval(quitarCarga, 2000);
});

function quitarCarga() {
    containerIcons.style.display = "none";
}
