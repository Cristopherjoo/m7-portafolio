//views.routes.js
import express from 'express'
const router = express.Router()
import {controllerHome, controllerCategorias, controllerProductos, controllerInventario, controllerUpdateProducto, controllergetProductosPorCategoria, controllerCarrito} from '../controllers/views.controller.js'

router.get(["/", "/home", "/principal"], controllerHome)

router.get("/categorias", controllerCategorias)

router.get("/productos/:id", controllerProductos)

router.get("/inventario", controllerInventario)

router.get("/update/producto/:id", controllerUpdateProducto)

router.get("/categoria/productos/:id/:categoria", controllergetProductosPorCategoria)

router.get("/carrito", controllerCarrito)

export default router