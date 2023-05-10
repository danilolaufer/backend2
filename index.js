const express = require("express")
const app = express()
const PORT = 8080
const uuid4 = require("uuid4")

let products = []

app.use(express.json())

app.get("/productos", (req, res)=>{
    res.send({data:products, message:"todos los productos enviados"})
})

app.post("/createProduct", (req, res)=>{
    //body
    let id = uuid4()
    let pr=req.body
    pr.id = id
    products.push(pr)
    res.send({data:pr, message:"Producto guardado correctamente"})

})

app.delete("/deleteProduct/:id", (req,res)=>{
    let id=req.params.id
    const arrayNew=products.filter((ele)=>{
        return ele.id !== id 
    })
    res.send({data:"", message:""})

})



app.listen(PORT, ()=>{
    console.log("server run on port", PORT);
});






