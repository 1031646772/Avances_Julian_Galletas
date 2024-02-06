const boton_Cerrar=document.getElementById("cerrarSesion");

boton_Cerrar.addEventListener("click",async()=>{
    try{
        const response=await fetch("http://127.0.0.1:3000/users/CerrarSesion",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({confirm:true}),
        }).then((response)=> response.json()).then((data)=>{
            let message=data.message
            if (message=="Se cerro Sesion"){
                console.log("Se borro el token");
                window.location.href="../index.html"
            }
            else{
                console.log("No se cerro sesion correctamente");
            }
        })
    }
    catch(err){
        console.log("Error al hacer la solicitud fetch", err)
    }
});