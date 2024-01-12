const barra=document.getElementById("barra");

barra.addEventListener("input", async function(e){
    let valorInput=barra.value
    try{
        const response=await fetch("http://127.0.0.1:3000/producto/ConsultarBarra",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({valorBusqueda:valorInput}),
        }).then((reponse)=>reponse.json()).then((data)=>{
            let coincidencias=data
            if(coincidencias!==null && coincidencias.length > 0){
                AccionDeBarra(coincidencias)
            }
            else{
                console.log("la respuesta viene nula")
            }
        })
    }
    catch(err){
        console.log("algo fallo al hacer la solicitud fecth", err)
    }
})

function AccionBarra(productos){
    const ContainerP1=document.querySelector(".Container-mother--");
    const ContainerP2=document.querySelector(".Container--In");
    ContainerP1.style.display="none"
    ContainerP2.style.display="none"
    let nuevoDiv
    const containerP=document.querySelector(".containerPBusqueda");
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