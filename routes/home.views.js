const { Router } =require ('express')
const  ProductManager  = require ("../controllers/productManager")
 const productManager = new ProductManager("/db/products.json")
const homeRouter = Router()

homeRouter.get('/', async (req, res)=>{
 
 const data =  await productManager.getProducts()
  res.render("index",{ data, style: "index.css"})
})
module.exports = Router;