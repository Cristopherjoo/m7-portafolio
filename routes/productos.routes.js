// productos.routes.js
import express from 'express';
const router = express.Router();
import {
    getProductos,
    addProductos,
    getProductosById,
    deleteProductosById,
    updateProductos
} from '../controllers/productos.controller.js';

// Rutas
router.get("/productos", getProductos);
router.get("/productos/:id", getProductosById);
router.post("/productos", addProductos);
router.delete("/productos/:id", deleteProductosById);
router.put("/productos", updateProductos);

export default router;
