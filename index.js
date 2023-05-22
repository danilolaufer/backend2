const express = require("express")
const app = express()
const PORT = 8080
const routesProducts = require ("./routes/products")
const routesCarts = require ("./routes/carts")
const routerUsers= require ("./routes/users")
const handlebars = require ("express-handlebars")
const http = require ("http");
const server = http.createServer(app);

//Socket
const { Server } = require("socket.io");
const io = new Server(server);

//VIEWS
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", __dirname+"/views")


//MAIN
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))



//PUBLIC
app.use(express.static(__dirname+"/public"))

let messages = [
    {author: "danilo", text:"hola coder"}

]


//Inicializar el Socket en el servidor
io.on("connection", (socket)=>{
    console.log("User Conectado");
    
    socket.emit("messages", messages)
    socket.on("new-message", (data)=>{
        console.log(data);
        messages.push(data)
        io.sockets.emit("messages", messages)
    })
})

//ROUTES
app.use("/products",routesProducts)
app.use("/carts",routesCarts) 
app.use("/users", routerUsers)


let users =[
    {
        name: 'Hernan',
        lastName: 'Rojas',
        age: '27',
        email: "horojas96@gmail.com",
        phone: '1150358772'
     }, 
     {
        name: 'Juan',
        lastName: 'Gonzalez',
        age: '28',
        email: "juan.gonzalez@gmail.com",
        phone: '1184785236'
     },
     {
        name: 'Jose',
        lastName: 'Perez',
        age: '29',
        email: "jose.perez@gmail.com",  
        phone: '1187523698'
     },
  
     {
        name: 'Pedro',
        lastName: 'Rodriguez',
        age: '30',
        email: "pedro.rodriguez@gmail.com",
        phone: '1187654321'
     },
  
     { 
        name: 'Marta',  
        lastName: 'Garcia',
        age: '31',
        email: "marta.garcia@gmail.com",
        phone: '1187654321'
     }
]


app.get("/", ( req, res )=>{
    res.render("index", users[Math.floor(Math.random() * users.length)])
})

let arrayPr = [
    {
        title: "tv",
        price:545
    },
    {
        title: "nvidia 3060",
        price:74000
    },
    {
        title: "intel i9",
        price:34000
    }
]

app.get("/testHand", ( req, res )=>{ 
    let user = {
        name: "Danilo",
        lastName: "Laura" ,
        role: "admin"
    }
    res.render("users",{
        user:user,
        IsAdmin: user.role === "admin",
        products: arrayPr // sera verdadero o falso
    })
    
})



server.listen(PORT, ()=>{
    console.log("server run on port", PORT);
});






