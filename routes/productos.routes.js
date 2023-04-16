import express from 'express'
const router = express.Router()
import {controllerProductos} from '../controllers/productos.controller.js'

router.get(['/api/v1/productos'], controllerProductos, (req, res) => {})

export default router