const mongoose = require("mongoose");
module.exports={
  connect: ()=>{
     return mongoose.connect("mongodb+srv://danilolaura:resbalones123@clusterecommerce.0exvxqh.mongodb.net/ecommerce",
    {useUnifiedTopology: true, useNewUrlParser: true })
    .then(connect=>{
      console.log("Conexion exitosa");
    })
    .catch(err => console.log(err));
  }

}




