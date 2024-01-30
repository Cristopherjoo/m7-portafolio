//productos.controller.js
import { Producto } from '../models/Producto.model.js';

// Obtener todos los productos
export const getProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json({ data: productos });
    } catch (error) {
        console.log(error);
        res.status(500).json({ code: 500, message: "Error al cargar los datos." });
    }
}

// Obtener producto por ID
export const getProductosById = async (req, res) => {
    try {
        const id = req.params.id;
        const producto = await Producto.findByPk(id);
        
        if (!producto) {
            return res.status(400).json({ code: 400, message: "No se ha encontrado el producto solicitado." });
        }

        res.json({ data: producto, message: "Producto encontrado correctamente." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ code: 500, message: "Error al buscar el producto deseado." });
    }
}

// Agregar un nuevo producto
export const addProductos = async (req, res) => {
    try {
        const { nombre, descripcion, categoria, precio, stock } = req.body;

        // Validar y convertir a número
        const categoriaId = parseInt(categoria);
        if (isNaN(categoriaId)) {
            return res.status(400).json({ code: 400, message: "El valor de 'categoria' no es válido." });
        }

        const nuevoProducto = await Producto.create({ nombre, descripcion, categoriaId, precio, stock });
        console.log(nuevoProducto);
        res.status(201).json({ code: 201, message: "Producto creado correctamente." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ code: 500, message: "Error al guardar el producto." });
    }
}

// Eliminar un producto por ID
export const deleteProductosById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedRows = await Producto.destroy({
            where: { id }
        });

        if (deletedRows === 0) {
            return res.status(400).json({ code: 400, message: "El producto que intenta eliminar no existe." });
        }

        res.json({ code: 200, message: "Producto eliminado correctamente." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ code: 500, message: "Error al eliminar el producto." });
    }
}

// Actualizar un producto
export const updateProductos = async (req, res) => {
    try {
        const { id, nombre, descripcion, categoria, precio, stock } = req.body;

        // Verificar si el producto existe
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(400).json({ code: 400, message: "El producto que intenta actualizar no existe." });
        }

        // Validar y convertir a número
        const categoriaId = parseInt(categoria);
        if (isNaN(categoriaId)) {
            return res.status(400).json({ code: 400, message: "El valor de 'categoria' no es válido." });
        }

        await Producto.update({ nombre, descripcion, categoriaId, precio, stock }, {
            where: { id }
        });

        res.json({ code: 200, message: "Producto actualizado correctamente." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ code: 500, message: "Error al actualizar el producto." });
    }
}

