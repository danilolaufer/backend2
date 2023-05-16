const express=  require ("express")

const {Router}= express

const router =  new Router()

router.get("/", (req, res)=>{
    res.send("hola mundo soy cart")
})

module.exports= router
