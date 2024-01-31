
//categorias.controller.js
import { Categoria } from '../models/Categoria.model.js'

//gets
export const getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.json({ data: categorias });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, message: "Error al cargar las categorías." });
    }
}


export const addCategorias = async (req, res) => {
    try {
        const { nombre } = req.body;
        const nuevaCategoria = await Categoria.create({ nombre });
        res.send("Categoría creada correctamente.");
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error al crear la categoría: ${error.message}`);
    }
}
