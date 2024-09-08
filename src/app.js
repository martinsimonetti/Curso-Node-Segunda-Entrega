const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars')

//const dirname = require('./utils.js')
const productRouter = require('../api/products/products.router.js')
const cartRouter = require('../api/carts/carts.router.js')

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Configuración de Handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
app.use(express.static(__dirname + "/views"))

app.use("/", productRouter)
app.use("/", cartRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})