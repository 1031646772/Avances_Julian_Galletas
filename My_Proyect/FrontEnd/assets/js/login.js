// Traemos elemenetos del DOM como contenedores, formularios, botones etc

const form=document.getElementById("Formulario");

const botonA=document.getElementById("Abrir-login");
const botonC=document.getElementById("Cerrar-login")
const modal=document.querySelector(".container-Mother")
const contanierModal=document.getElementById("ModalLogin")

// Añadimos eventos para el click al boton de abrir modal 
botonA.addEventListener("click", ()=>{
    //Aqui el contendor del modal se alteran los estilos, para que aparezca e pantalla
    contanierModal.style.display="flex"
    // Para que no hayan desplazamiento cuando este el modal presente, sobretodo de la barra
    body.style.overflow="hidden"
})

botonC.addEventListener("click", ()=>{
    // Ahora se hace lo mismo con el de cerrarç
    // Se añade las animaciones del menu 2 para cuando desaparezca el modal
    modal.style.animation = 'Menu2 1s ease-in-out';
    // Agrega un escuchador para el evento 'animationend'
    modal.addEventListener("animationend", () => {
        modal.style.display = "none";
    }, { once: true });
    setInterval(quitarAnimacion,1000)
    // Quita la animacion despues de 2 segundos
})

contanierModal.addEventListener("click", (event)=>{
    if (event.target === contanierModal) {
        contanierModal.style.display="none"
        body.style.overflow="auto"
    }
    //Esto evita y valida que solo tome el evento para el contendor cuando se pulsa en el y no el el contenido por ejemplo en el formulario
})

//Quita la animacion 
function quitarAnimacion(){
    contanierModal.style.display="none"
    body.style.overflow="auto"
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