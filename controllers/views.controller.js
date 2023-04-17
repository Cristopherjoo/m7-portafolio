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
    /* let categorias = await  Categoria.findAll({
        raw:true,
    }); */
   
    
    const [results, metadata] = await sequelize.query(`
            SELECT ct.id, ct.nombre, count(*) FROM productos pr
            JOIN categorias ct
            ON ct.id = "categoriaId"
            group by ct.id, ct.nombre
    `);

    console.log(results, metadata)

    res.render("categorias", {
        categorias: results
    });
}

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
    let carrito = await sequelize.query(`
        select pd.id, pd.nombre, pd.precio, cp.cantidad, (pd.precio * cp.cantidad) total from carritos ca
        join carro_productos cp
        on ca.id = cp."carritoId"
        join productos pd
        on pd.id = cp."productoId"
        order by pd.id
    `)

    let productos = carrito[0];
    let total = productos.reduce(
        (accumulator, currentValue) => accumulator + parseInt(currentValue.total),
        0
      )
    res.render("carrito", {
        carrito: productos,
        total     
    });
}