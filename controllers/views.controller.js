//views.controller.js
import { Producto } from '../models/Producto.model.js'
import { Categoria } from '../models/Categoria.model.js'
import { Carrito } from '../models/Carro.model.js'
import { sequelize } from '../database/bd.js'


export const controllerHome = async (req, res) => {
    let productos = await  Producto.findAll({
        order: [
            ["nombre", "ASC"]
        ]
    });
    res.render("home", {
        productos
    });
}

export const controllerCategorias = async (req, res) => {
    try {
        // Obtener todas las categorías
        let categorias = await Categoria.findAll({
            raw: true,
        });

        // Consultar la cantidad de productos por categoría utilizando Sequelize
        const [results, metadata] = await sequelize.query(`
            SELECT ct.id, ct.nombre, count(*) FROM productos pr
            JOIN categorias ct
            ON ct.id = pr."categoriaId"
            group by ct.id, ct.nombre
        `);

        console.log(results, metadata);

        res.render("categorias", {
            categorias: categorias,
            productosPorCategoria: results,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al cargar las categorías." });
    }
};

export const controllerProductos = async (req, res) => {
    let id = req.params.id;
    let producto = await  Producto.findByPk(id);
    console.log(producto)
    res.render("productoDetails", {
        producto
    });
}

export const controllerInventario = async (req, res) => {
    try {
        let productos = await  Producto.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
        let categorias = await  Categoria.findAll({
            raw:true,
            order: [
                ['id', 'ASC']
            ]
        });

        console.log(categorias);

        res.render("inventario", {
            productos,
            categorias
        });
        
    } catch (error) {
        
    }
}

export const controllerUpdateProducto = async (req, res) => {
    let id = req.params.id;
    let producto = await  Producto.findByPk(id,{
        raw:true,
        include: "categoria"
    });
    let nombreCategoria = producto["categoria.nombre"]
    let categorias = await  Categoria.findAll({
        raw:true
    });
    res.render("updateProducto", {
        producto,
        categorias,
        nombreCategoria
    });
}


export const controllergetProductosPorCategoria = async (req, res) => {
    let id = req.params.id;
    let categoria = req.params.categoria;
    let productos = await  Producto.findAll({
        raw:true,
        where: {
            categoriaId: id,
        },
        order:[
            ['id', "ASC"]
        ]

    });

    res.render("detalleCategoriaProductos", {
        categoria,
        productos
    });
}


export const controllerCarrito = async (req, res) => {
    try {
        const carritoQuery = await sequelize.query(`
            SELECT pd.id, pd.nombre, pd.precio, cp.cantidad, (pd.precio * cp.cantidad) total FROM carritos ca
            JOIN carro_productos cp ON ca.id = cp."carritoId"
            JOIN productos pd ON pd.id = cp."productoId"
            ORDER BY pd.id
        `);

        const productosEnCarrito = carritoQuery[0];
        
        const total = productosEnCarrito.reduce(
            (accumulator, producto) => accumulator + (producto.total || 0),
            0
        );

        res.render("carrito", {
            carrito: productosEnCarrito,
            total
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al cargar el carrito." });
    }
};
