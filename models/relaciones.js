//Realizar importación de modelos / Entidades
import { Producto } from './Producto.model.js'
import { Categoria } from './Categoria.model.js'
import { CarroProductos } from './CarroProducto.model.js'
import { Carrito } from './Carro.model.js'
import { Usuario } from './Usuario.model.js'
import { Venta } from './Venta.model.js'
import { DetalleVenta } from './DetalleVenta.model.js'

//Relacionar productos con categorias
//Donde producto tenga una sola categoria
//una categoria TIENE MUCHO productos
Categoria.hasMany(Producto)
Producto.belongsTo(Categoria)


//Lógica de muchos a muchos entre productos y carrito
//del lado de carro a tabla pivote (carro_productos)
Carrito.hasMany(CarroProductos)
CarroProductos.belongsTo(Carrito)

//relación de producto con tabla carro_productos
//producto está en muchos registros de carro_productos
Producto.hasMany(CarroProductos)
//Los registros de carro_productos pertenecen a un producto.
CarroProductos.belongsTo(Producto)


//relación de usuario con carrito
//usuarios está presente en muchos registros de la tabla carrito
Usuario.hasMany(Carrito)
//los registros de carrito pertenecen a 1 solo usuario
Carrito.belongsTo(Usuario)


//relación usuario - venta

//usuario tiene muchas ventas
Usuario.hasMany(Venta)
Venta.belongsTo(Usuario)

//relación entre detalle_ventas con ventas
//venta está presente en muchos detalles
Venta.hasMany(DetalleVenta)
//los detalles de la venta pertenecen a una venta
DetalleVenta.belongsTo(Venta)


//relación entre detalle_ventas y productos
//productos están presentes en muchos detalles venta
Producto.hasMany(DetalleVenta)
//cada detalle venta pertenece a un producto.
DetalleVenta.belongsTo(Producto)
