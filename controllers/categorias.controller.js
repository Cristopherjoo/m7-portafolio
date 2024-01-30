
//categorias.controller.js
import { Categoria } from '../models/Categoria.model.js'

//gets
export const getCategorias = async (req, res) => {
    Categoria.findAll().then(categorias => {
        res.json({data: categorias});
    }).catch(error => {
        res.json({code: 500, message:"Error al cargar las categorias."});
    })
}

export const addCategorias = async (req, res) => {
    try{
        let {nombre} = req.body;
        let nuevaCategoria = await Categoria.create({nombre});
        res.send("Categoria creada correctamente.")
    }catch(error){
        console.log(error)
        res.status(500).send("Error al crear la categoria.")
    }
}