let socket = io()
socket.on("messages", (data)=>{
    render(data)
})

function render(data) {
    const html = data.map(elem =>{ 
        return(
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
//okey


let user;
let chatBox = document.getElementById("chatBox");

Swal.fire({
    title:"Identificate flaco",
    input:"text" ,
    text: "Ingresa tu nombre para identificarte en el chat",
    inputValidator: (value) => {
        return !value && "necesitas escribir un nombre de usuario para continuar!!!!"
    },
    allowOutsideClick:false

}).then(result => {
    user=result.value
})


chatBox.addEventListener("keyup",evt=>{
    if (evt.key==="Enter") {
        if (chatBox.value.trim().length>0) {
            socket.emit("message",{user:user,message:chatBox.value})
            chatBox.value="";
            
        }
    }
})
//socket lsiteners 
socket.on("messageLogs", data=>{
    let log= document.getElementById("messageLogs")
    let messages = ""
    data.forEach(message => {
        messages= messages+`${message.user} : ${message.message}</br>`
    });
    log.innerHTML=messages;
})
