import express from 'express';
const router = express.Router();
import {controllerHome, controllerCategorias, controllerProductos, controllerInventario, controllerUpdateProducto, controllergetProductosPorCategoria, controllerCarrito} from '../controllers/views.controller.js'

router.get(["/", "/home", "/principal"], controllerHome, (req, res) =>{});

router.get("/categorias", controllerCategorias, (req, res) =>{});

router.get("/productos/:id", controllerProductos, (req, res) =>{});

router.get("/inventario", controllerInventario, (req, res) =>{});

router.get("/update/producto/:id", controllerUpdateProducto, (req, res) =>{});

router.get("/categoria/productos/:id/:categoria", controllergetProductosPorCategoria, (req, res) =>{});

router.get("/carrito", controllerCarrito, (req, res) =>{});

export default router;