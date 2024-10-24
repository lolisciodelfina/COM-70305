
import express from "express"
import {ProdManager} from "./Dao/ProdManager.js"
const PORT = 3000
const app = express()
const rutaArchivo = "./src/Data/products.json"
const prodManager = new ProdManager (rutaArchivo)

app.get("/", (req,res) =>{
    res.setHeader(`Content-Type`,`text/plain`)
    res.status(200).json.send(`<h1>Home</h1>`)
})
app.get("/Menu",async (req,res) =>{
    console.log("Solicitando menú");
    let productos = await prodManager.getProductos()
    console.log("Menú obtenido");
    let {limit, skip} = req.query
    let respuesta = productos
    if (!limit){
        limit=productos.length
    }else{
        limit=Number(limit)
        if(isNaN(limit)){
            return res.send(`limit debe ser numérico`)
        }
    }
    if (!skip){
        skip=0
    }else{
        skip=Number(skip)
        if (isNaN(skip)){
            return res.send(`skip debe ser numérico`)
        }
    }
    respuesta = respuesta.slice(skip, limit + skip)
    res.send(respuesta)
})
app.get("/Menu/:id", async (req,res) =>{
    let {id} = req.params
    id=Number(id)
    if(isNaN(id)){
        return res.status(400).json.send(`id debe ser numérico`)
    }
    let productos = await prodManager.getProductos();
    let product = productos.find (p=>p.id===id)
    if(!product){
        return res.status(404).json.send (`No se encuentran productos con este id: ${id}`)
    }
    res.status(200).json.send(product);
})

app.listen(PORT, ()=>{
    console.log(`Server online en el puerto ${PORT}`)
})

console.log("Hola")
