const express = require("express")
const app = express()
const PORT = 8080
const routesProducts = require ("./routes/products")
const routesCarts = require ("./routes/carts")
const handlebars = require ("express-handlebars")

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine", "handlebars")
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))

app.use( function(req, res, next){
    console.log("Time: ", Date.now());
    next()
})


app.use("/static", express.static(__dirname + "/public"))

app.use("/products",routesProducts)
app.use("/carts",routesCarts) 

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
        role: "user"
    }
    res.render("users",{
        user:user,
        IsAdmin: user.role === "admin",
        products: arrayPr // sera verdadero o falso
    })
    
})



app.listen(PORT, ()=>{
    console.log("server run on port", PORT);
});






