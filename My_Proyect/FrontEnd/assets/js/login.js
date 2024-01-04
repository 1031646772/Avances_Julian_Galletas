const form=document.getElementById("Formulario");

form.addEventListener("submit", async(e)=>{
    console.log("entro")
    e.preventDefault()
    const user=document.getElementById("Nombre")
    const contrasena=document.getElementById("Contrasena")

    if(user.value !== undefined && user.value !==null && contrasena.value !== undefined && contrasena.value !== null){
        try{
            const response=await fetch('http://127.0.0.1:3000/users/Ingresar', {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({User:user.value, Contrasena:contrasena.value}),
            }).then((response)=>response.json()).then((data)=>{
                let valor= data.message;
                if(valor==="Usuario encontrado"){
                    alert ("Bienvenido");
                    window.location.href="./RegistrarProducto.html"
                }
                else{
                    alert("Usuario o contraseña incorrectos, reintente")
                }
            })
        }
        catch(err){
            console.log("Algo fallo al hacer la solicitud fetch", err)
        }
    }
    else{
        console.log("algun dato esta nulo");
    }
    
})