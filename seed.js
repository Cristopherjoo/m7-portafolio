//seed.js
import { Producto } from './models/Producto.model.js'
import { Categoria } from './models/Categoria.model.js'
import { Usuario } from './models/Usuario.model.js'

const usuarios = [
    { nombre: "marta", email: "marta@mail.com", password: '12345' },
    { nombre: "juan", email: "juan@mail.com", password: '123456' },   
]

const categorias = [
    { nombre: "Iphone 14" },
    { nombre: "Iphone 13" },
]

const productos = [
    { nombre: "Iphone 1", descripcion: "descripción Iphone 1", precio: 25000, stock: 10, categoria:1},
    { nombre: "Iphone 2", descripcion: "descripción Iphone 2", precio: 20000, stock: 20, categoria:1}
]


 const cargarUsuarios = async () => {
    for (let index = 0; index < usuarios.length; index++) {
        const [user, created] = await Usuario.findOrCreate({
            where: { nombre: usuarios[index].nombre },
            defaults: {
              nombre: usuarios[index].nombre,
              email: usuarios[index].email,
              password: usuarios[index].password
            }
          });
    }
 }

 const cargarCategoriasYProductos = async () => {
    for (let index = 0; index < categorias.length; index++) {
        const [categoria, created] = await Categoria.findOrCreate({
            where: { nombre: categorias[index].nombre },
            defaults: {
              nombre: categorias[index].nombre,
            }
          });
    }
    for (let index = 0; index < productos.length; index++) {
        const [producto, created] = await Producto.findOrCreate({
            where: { nombre: productos[index].nombre },
            defaults: {
              nombre: productos[index].nombre,
              descripcion: productos[index].descripcion,
              precio: productos[index].precio,
              stock: productos[index].stock,
              categoriaId: productos[index].categoria,
            }
          });
    }
 }

 const main = () => {
    cargarUsuarios();
    cargarCategoriasYProductos();
 }
 main();