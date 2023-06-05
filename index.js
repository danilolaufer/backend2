const express = require("express")
const Database = require("./dao/db.js")
const Product = require("./dao/models/models.js")
const PORT = 8080 || process.env.PORT
const app = express();
const cartsRouter = require("./routes/cart.route");
const productRouter = require("./routes/product.route");
const routesProducts = require ("./routes/products");
const routesCarts = require ("./routes/carts");
const path = require("path");
const indexRouter = require("./routes/index.router.js");
const realTimeProductsRouter = require("./routes/realTimeProducts.views.js");
const homeRouter = require ("./routes/home.views.js");
const routerUsers= require("./routes/users")
const handlebars = require("express-handlebars");
const multer = require("multer");
const upload = multer({dest: "uploads/"})
//Server, ProductManager
const ProductManager = require ("./controllers/productManager.js");
const productManager = new ProductManager("db/products.json")

app.use( function(req, res, next){
    console.log("Time: ", Date.now());
    next()
})


//API
app.use("/api", indexRouter)
app.use('/', homeRouter)
app.use('/realtimeproducts', realTimeProductsRouter)

// //Http import
const http = require ("http");
const server = http.createServer(app);

// Socket
const { Server } = require("socket.io");
const io = new Server(server);

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname+"/views")



//MAIN
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))

//img
app.post("/upload", upload.single("image"), (req, res) => {
    const file = req.file;
    // Aquí puedes realizar acciones adicionales con el archivo, como guardarlo en una base de datos o procesarlo
    // y luego enviar la respuesta adecuada al cliente
    res.send("Imagen recibida correctamente");
  });
app.get("/", (req, res)=>{
    Product.find({})
    .then(pr =>{
        res.status(200).send({
            msg:"todos los productos",
            data:pr
    })
    .catch(err => {
        res.status(500).send({
            msg:"Erro al obtener productos",
            data:pr
        })
    });
    })
})
app.post("/saveProduct", (req, res)=>{
    let newPr=req.body
    let product = new Product(newPr)
    product.save()
    .then(pr =>{
        res.status(201).send({
            msg:"Producto guardado",
            data:pr
    })
    .catch(err => console.log(err));
    })
})
//PUBLIC
app.use(express.static(path.join(__dirname, "public")));

let messages = []  //si


//Inicializar el Socket en el servidor
io.on("connection", (socket)=>{
    console.log("Nuevo cliente conectado");
    
    socket.emit("messages", messages)
    socket.on("new-message", (data)=>{
        messages.push(data)
        io.emit("messageLogs", messages)
        io.sockets.emit("messages", messages)
    })
    socket.on("message", data =>{
        messages.push(data)
        io.emit("messageLogs", messages)
    })
    socket.on('addProduct', async (data) => {
        const added = await productManager.addProduct(data)
        io.emit('allProducts', await productManager.getProducts())
    })
})

//ROUTES
app.use("/products",routesProducts)
app.use("/carts",routesCarts) 
app.use("/users", routerUsers)
app.use("/carts", cartsRouter);
app.use("/products", productRouter);


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
app.get("*", (req, res) => {
    res.status(404).json({ status: "error", msg: "Path not found" });
});


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
        products: arrayPr
    })
    
})



app.listen(PORT, ()=>{
    console.log("running on port 8080");
    Database.connect()
});






