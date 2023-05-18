const express=  require ("express")
const uuid4 = require("uuid4")
const {Router}= express
const router =  new Router()


let products = []


router.get("/", (req, res)=>{
    res.json({data:products, message:"todos los productos enviados"})
})

router.post("/createProduct", (req, res)=>{
    //body
    let pr=req.body
    pr.id= uuid4()
    console.log(pr);
    products.push(pr)
    res.json({data:pr, message:"Producto guardado correctamente"})

})

router.delete("/deleteProduct/:id", (req,res)=>{
    let id=req.params.id
    const arrayNew=products.filter((ele)=>{
        return ele.id !== id 
    })
    console.log(arrayNew);
    products = arrayNew
    res.send({data:products, message:"Producto eliminado correctamente"})
    res.redirect("/products/createProduct")

})

router.put("/updateProduct/:id", (req, res)=>{
    let id = req.params.id
    let infoNew= req.body

    let arrayUpdate = products.map((ele)=>{
        if (ele.id==id) {
            return {...infoNew, id}  
        }else{
            return ele
        }
    })
    console.log(arrayUpdate);
    products = arrayUpdate
    res.send({data:"", message: "Producto actualizado correctamente"}) 

})

module.exports= router