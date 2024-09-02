const express = require('express')
const router = express.Router()
const ProductManager = require('../../src/productManager')

const productManager = new ProductManager("")

router.get("/products", async (req, res) => { 
    let consultas = req.query
    const respuesta = await productManager.getProducts()
    if(respuesta.status === "success"){
        if (Object.keys(consultas).length !== 0) {            
            let elementosMostrar =  respuesta.payload.slice(0, consultas.limit)
            res.status(200).json(elementosMostrar)
        } else {
            res.status(200).json(respuesta.payload)
        }
    } else {
        res.status(404).json(respuesta.payload)
    }    
})

router.get("/products/:pid", async (req, res) => {
    const productoId = parseInt(req.params.pid)

    const respuesta = await productManager.getProductById(productoId)
    
    if(respuesta.status === "success"){
        res.status(200).json(respuesta.payload)
    } else {
        res.status(200).json(respuesta.error)
    }
})

router.post("/products", async (req, res) => {
    const nuevoProducto = {
        ...req.body
    }    
    const respuesta = await productManager.addProduct(nuevoProducto)
    if(respuesta.status === "success"){
        res.status(201).json(respuesta.payload)
    } else {
        res.status(404).json(respuesta.error)
    }    
})

router.put("/products/:pid", async (req, res) => {
    const productoId = parseInt(req.params.pid)

    const respuesta = await productManager.editProduct(productoId, req.body)
    
    if(respuesta.status === "success"){
        res.status(200).json(respuesta.payload)
    } else {
        res.status(404).json(respuesta.error)
    }    
})

router.delete("/products/:pid", async (req, res) => {
    const productoId = parseInt(req.params.pid)
    
    const respuesta = await productManager.deleteProduct(productoId)
    
    if(respuesta.status === "success"){
        res.status(200).json(respuesta.payload)
    } else {
        res.status(404).json(respuesta.error)
    }
})

module.exports = router