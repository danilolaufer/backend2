const express = require("express")
const app = express()
const PORT = 8080
const routesProducts = require ("./routes/products")
const routesCarts = require ("./routes/carts")

app.use(express.json()) 
app.use(express.urlencoded({extended:true}))

app.use( function(req, res, next){
    console.log("Time: ", Date.now());
    next()
})


app.use("/static", express.static(__dirname + "/public"))

app.use("/products",routesProducts)
app.use("/carts",routesCarts) 





app.listen(PORT, ()=>{
    console.log("server run on port", PORT);
});






