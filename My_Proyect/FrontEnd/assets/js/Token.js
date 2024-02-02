document.addEventListener("DOMContentLoaded", async()=>{
    const response=await fetch('http://127.0.0.1:3000/users/TraerToken',{
        method:'POST',
        headers:{
            'Content-type':'application/json',
        },
        body: JSON.stringify({confirmacion:true}),
    }).then((response)=>response.json).then((data)=>{
        let ObjetoToken=data
        console.log(ObjetoToken)
        let fecha=new Date()
        if(ObjetoToken.Token!=0 && ObjetoToken.Email!=null && ObjetoToken.Email!=undefined &&
        ObjetoToken.Nombre!=null && ObjetoToken.Nombre!=undefined && ObjetoToken.Contrasena!=null 
        && ObjetoToken.Contrasena!=undefined){
         console.log("Fecha de ingreso",fecha)
        }
        else{
            window.location.href='../index.html'
        }
    })
})