const barra=document.getElementById("barra");

barra.addEventListener("input", async function(e){
    const valorInput=barra.value
    console.log(valorInput)
    if (valorInput !==null || valorInput==undefined || valorInput.length > 0){
        limpiarBarra(valorInput)
    }
    try{
        const response=await fetch("http://127.0.0.1:3000/producto/ConsultarBarra",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({valorBusqueda:valorInput}),
        }).then((reponse)=>reponse.json()).then((data)=>{
            let coincidencias=data.message
            if(coincidencias!==null && coincidencias!=="No hay coincidencias"){
                console.log(coincidencias)
                AccionDeBarra(coincidencias)
            }
            else{
                let mensajeB=document.querySelector(".message_Barra")
                mensajeB.style.display="block"
                limpiarBarra(valorInput);
            }
        })
    }
    catch(err){
        console.log("algo fallo al hacer la solicitud fecth", err)
    }
})

function limpiarBarra(valorInput){
    let nuevoDiv=""
    const containerP=document.querySelector(".Productos");
    containerP.innerHTML=nuevoDiv
    if (valorInput.length < 1 || valorInput==0){
        const ContainerP1=document.querySelector(".Container-mother--");
        const ContainerP2=document.querySelector(".Container--In");
        ContainerP1.style.display="flex"
        ContainerP2.style.display="flex"
        nuevoDiv=""
        containerP=document.querySelector(".Productos");
        containerP.innerHTML=nuevoDiv
    }
    else{
        let mensajeB=document.querySelector(".message_Barra")
        mensajeB.style.display="block"
        const ContainerP1=document.querySelector(".Container-mother--");
        const ContainerP2=document.querySelector(".Container--In");
        ContainerP1.style.display="none"
        ContainerP2.style.display="none"
    }
}

function AccionDeBarra(productos){
    let mensajeB=document.querySelector(".message_Barra")
    mensajeB.style.display="none"
    console.log(productos)
    const ContainerP1=document.querySelector(".Container-mother--");
    const ContainerP2=document.querySelector(".Container--In");
    ContainerP1.style.display="none"
    ContainerP2.style.display="none"
    let nuevoDiv=""
    const containerP=document.querySelector(".Productos");
    productos.forEach(function(item) {
        if(item.Estado=="Activo"){
            nuevoDiv +=`
                <div class="card">
                    <img src="${item.Imagen}" alt="">
                    <h1>${item.Nombre}</h1>
                    <div class="containerButton">
                        <button onclick="TomarDatos(${item.Id_Producto})">Actualizar</button>
                        <button onclick="EliminarProducto(${item.Id_Producto})">Eliminar</button>
                    </div>
                </div>`
        }
        else if(item.Estado=="Inactivo"){
            nuevoDiv +=`
                <div class="card">
                    <img src="${item.Imagen}" alt="">
                    <h1>${item.Nombre}</h1>
                    <div class="containerButton">
                        <button onclick="ActivarProducto(${item.Id_Producto})">Activar</button>
                    </div>
                </div>`
        }
    });
    containerP.innerHTML=nuevoDiv
}