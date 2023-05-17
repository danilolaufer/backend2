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

app.get("/", ( req, res )=>{
    let user = {
        name: "Israel"
    }
    res.render("index" , user)
})
app.get("/testHand", ( req, res )=>{
    let user = {
        name: "Danilo",
        lastName: "Laura",
        role: "user"
    }
    res.render("user", {
        user: user,
        IsAdmin: user.role === "admin"
    })
})


app.listen(PORT, ()=>{
    console.log("server run on port", PORT);
});






