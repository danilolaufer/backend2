const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    category:{
        type:String,
        required:true,
        enum:["Remeras", "Zapatillas", "Objetos"]
    }
})

const Product = mongoose.model("product", ProductSchema)
module.exports = Product