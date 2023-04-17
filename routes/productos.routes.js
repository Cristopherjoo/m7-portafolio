import express from 'express';
const router = express.Router();
import {getProductos, addProductos, getProductosById, deleteProductosById, updateProductos } from '../controllers/productos.controller.js'

router.get("/productos", getProductos, (req, res) =>{});
router.get("/productos/:id", getProductosById, (req, res) =>{});
router.post("/productos", addProductos, (req, res) =>{});
router.delete("/productos/:id", deleteProductosById, (req, res) =>{});
router.put("/productos", updateProductos, (req, res) =>{});

export default router;