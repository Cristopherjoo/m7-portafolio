//ventas.routes.js

import express from 'express'
const router = express.Router()
import {generarVenta} from '../controllers/ventas.controller.js'

//Rutas
router.post("/ventas", generarVenta)


export default router