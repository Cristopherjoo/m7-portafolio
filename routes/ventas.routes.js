import express from 'express';
const router = express.Router();
import {generarVenta} from '../controllers/ventas.controller.js'
//rutas
router.post("/ventas", generarVenta, (req, res) =>{});

export default router;