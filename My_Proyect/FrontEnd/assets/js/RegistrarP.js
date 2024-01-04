'use strict';

//Traer elementos para el file preview
let boton=document.getElementById("select")
let inputFile=document.getElementById("imgfile")
boton.addEventListener("click", ()=>{
    widget_cloudinary.open();
})

var NombreFile=""
function getImage(){
    return NombreFile
}
let widget_cloudinary= cloudinary.createUploadWidget({
    cloudName:'dskllufl9',
    uploadPreset:'h933ycki'
}, (err,result)=>{
    if(!err && result && result.event==="success"){

        NombreFile=result.info.secure_url
        getImage()
    }
    mostrarpreview(NombreFile)
})

function mostrarpreview(URL){
    console.log(URL)
    //Ojo a esta parte eh?
    if (URL) {
        let div=document.querySelector(".previewImagenn")
        let h1=document.getElementById("h1img")
        div.innerHTML = `<img src="${URL}" alt="Preview">`;
        h1.style.top=0
    } else {
        // Limpiar la vista previa si no se selecciona ningún archivo
        let div=document.querySelector(".previewImagenn")
        div.innerHTML = "";
    }
}

// Objeto formulario
let form = document.getElementById("form");
form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe de inmediato

    let nom = document.getElementById("Nombre");
    let des = document.getElementById("Descripcion");
    if (nom.value !== null && nom.value !== undefined && nom.value.trim() !== '' &&
    des.value !== null && des.value !== undefined && des.value.trim() !== '') {
        let NombreImg = getImage()
        let URL=encodeURIComponent(NombreImg.toString())
        if(NombreImg !== null && NombreImg !== undefined && NombreImg.trim() !== ''){
                try {
                    const response = await fetch("http://127.0.0.1:3000/producto/CrearProducto", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ imagen: getImage().toString(), nombre: nom.value, descripcion: des.value }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            let valor = data.message;
                            if (valor === "Producto Creado") {
                                alert("Producto Creado");
                            } else {
                                alert("Algo falló en la respuesta");
                            }
                        });
                } catch (error) {
                    console.error("Error en la solicitud fetch:", error);
                }
        }
        else{
            console.log("No esta llegando URL")
        }
    } else {
        alert("Por favor, llena todos los campos");
    }
});









