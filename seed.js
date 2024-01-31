// seed.js
import { Producto } from './models/Producto.model.js';
import { Categoria } from './models/Categoria.model.js';
import { Usuario } from './models/Usuario.model.js';

const usuarios = [
    { nombre: "marta", email: "marta@mail.com", password: '12345' },
    { nombre: "juan", email: "juan@mail.com", password: '123456' },
];

const categorias = [
    { nombre: "Iphone 14" },
    { nombre: "Iphone 13" },
];

const productos = [
    { nombre: "Iphone 1", descripcion: "descripción Iphone 1", precio: 25000, stock: 10, categoria: 1 },
    { nombre: "Iphone 2", descripcion: "descripción Iphone 2", precio: 20000, stock: 20, categoria: 1 },
];

const cargarUsuarios = async () => {
    const promises = usuarios.map(async (user) => {
        const [createdUser, created] = await Usuario.findOrCreate({
            where: { nombre: user.nombre },
            defaults: { ...user },
        });
        return createdUser;
    });
    return Promise.all(promises);
};

const cargarCategoriasYProductos = async () => {
    const categoriasPromises = categorias.map(async (categoria) => {
        const [createdCategoria, created] = await Categoria.findOrCreate({
            where: { nombre: categoria.nombre },
            defaults: { ...categoria },
        });
        return createdCategoria;
    });
    const productosPromises = productos.map(async (producto) => {
        const [createdProducto, created] = await Producto.findOrCreate({
            where: { nombre: producto.nombre },
            defaults: {
                ...producto,
                categoriaId: producto.categoria,
            },
        });
        return createdProducto;
    });
    return Promise.all([...categoriasPromises, ...productosPromises]);
};

const main = async () => {
    try {
        await cargarUsuarios();
        await cargarCategoriasYProductos();
        console.log('Datos cargados correctamente.');
    } catch (error) {
        console.error('Error al cargar datos:', error);
    }
};

main();
