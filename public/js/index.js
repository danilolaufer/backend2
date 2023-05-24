let socket = io()

socket.on("messages", (data)=>{
    render(data)
})

function render(data) {
    const html = data.map(elem =>{ 
        return (
            `<div class="container">
            <strong> ${elem.author} </strong>:
            <em> ${elem.text} </em>
        </div>` 
        )
    }).join(" ")
    document.getElementById("caja").innerHTML= html
    
}


function addMensaje(e){
    const mensaje={
        author: document.getElementById("username").value, 
        text: document.getElementById("texto").value
    }
    
    socket.emit("new-message", mensaje)
    console.log(mensaje);
    return false
}