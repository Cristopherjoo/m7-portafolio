// carrito.routes.js
import express from 'express';
const router = express.Router();
import { getCarrito, addProductoCarro, deleteProductoCarro } from '../controllers/carritos.controller.js';

// Rutas
router.get('/carritos', getCarrito);
router.post('/carritos', addProductoCarro);
router.delete('/carritos', deleteProductoCarro);

export default router;
