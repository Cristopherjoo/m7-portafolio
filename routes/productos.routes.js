import express from 'express'
const router = express.Router()
import {getProductos, addProductos} from '../controllers/productos.controller.js'

router.get('/productos', getProductos, (req, res) => {})
router.post('/productos', addProductos, (req, res) => {})

export default router