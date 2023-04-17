//productos.controller.js
import { Producto } from '../models/Producto.model.js'

export const getProductos = async (req, res) => {
    let productos = await Producto.findAll()
    console.log(productos)
    if (productos.length == 0) {
        res.json({ data: productos, message: 'Base de datos sin productos' })
    } else {
        res.json({ data: productos, message: 'productos disponibles' })
    }
}

export const addProductos = async (req, res) => {
    try {
        let{nombre, descripcion, categoria, precio, stock} = req.body
        let nuevoProducto = await Producto.create({ nombre, descripcion, categoria, precio, stock })
        res.send('producto creado  correctamente')

    }catch(error){
        res.status(500).send('Error al guardar el producto')
    }
}


