const form = document.getElementById("Formulario");
const botonA = document.getElementById("Abrir-login");
const botonC = document.getElementById("Cerrar-login");
const modal = document.querySelector(".container-Mother");
const contanierModal = document.getElementById("ModalLogin");
const body=document.body
// Añadimos eventos para el click al boton de abrir modal 
botonA.addEventListener("click", () => {
    // Aplica la animación 'Menu' al abrir el modal
    modal.style.animation = 'Menu 1s ease-in-out';
    contanierModal.style.display = "flex";
    modal.style.display="flex"
    body.style.overflow = "hidden";
});

botonC.addEventListener("click", () => {
    // Agrega la animación 'Menu2' al cerrar el modal
    modal.style.animation = 'Menu2 1s ease-in-out';
    // Agrega un escuchador para el evento 'animationend'
    modal.addEventListener("animationend", quitarAnimacion, { once: true });
});

contanierModal.addEventListener("click", (event) => {
    if (event.target === contanierModal) {
        quitarAnimacion();
    }
});

function quitarAnimacion() {
    // Restaura la visualización del modal a su estado inicial
    contanierModal.style.display="none"
    modal.style.display = "none";
    body.style.overflow = "auto";
    // Reinicia la animación para futuras aperturas
    modal.style.animation = 'none';
    // Forza un reflow para que la animación se reinicie correctamente
    void modal.offsetWidth;
    // Restablece la animación
    modal.style.animation = null;
    
}


//Evento listener para cuando se envie el formulario 
// Ejecuta una funcion asincrona 
form.addEventListener("submit", async(e)=>{
    console.log("entro")
    e.preventDefault()
    // Utilizamos el prevent default para que evite realizar las operaciones normales para este evento 
    const user=document.getElementById("Nombre")
    const contrasena=document.getElementById("Contrasena")
    // Se traen los inputs que contienen los datos de acceso 
    // Se evaluan los valores para determinar que no esten vacios
    if(user.value !== undefined && user.value !==null && contrasena.value !== undefined && contrasena.value !== null){
        // Ejecutamos un try y un catch para que intente ejecutar una solicitud fetch
        try{
            const response=await fetch('http://127.0.0.1:3000/users/Ingresar', {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({User:user.value, Contrasena:contrasena.value}),
            }).then((response)=>response.json()).then((data)=>{
                // evalua las promesas que tienen una data 
                // Guardamos la informacion o el mensaje que devuelve el controlador en una variable

                let valor= data.message;
                if(valor==="Usuario encontrado"){
                    alert ("Bienvenido");
                    // Permitimos el acceso
                    window.location.href="./RegistrarProducto.html"
                }
                else{
                    alert("Usuario o contraseña incorrectos, reintente")
                }
            })
        }
        catch(err){
            //Por si falla al hacer la solicitud fetch 
            console.log("Algo fallo al hacer la solicitud fetch", err)
        }
    }
    else{
        console.log("algun dato esta nulo");
    }
    
})