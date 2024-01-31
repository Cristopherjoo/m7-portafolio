import { Producto } from '../models/Producto.model.js'
import { Venta } from '../models/Venta.model.js'
import { Usuario } from '../models/Usuario.model.js'
import { DetalleVenta } from '../models/DetalleVenta.model.js'
import { CarroProductos } from '../models/CarroProducto.model.js'
import { Carrito } from '../models/Carro.model.js'
import { sequelize } from '../database/bd.js'

//gets
export const generarVenta = async (req, res) => {
    try {
        let idCliente = req.body.idCliente;
        const t = await sequelize.transaction();

        // Verifica la existencia del usuario antes de continuar
        let usuarioExistente = await Usuario.findByPk(idCliente);
        if (!usuarioExistente) {
            throw new Error("El usuario no existe.");
        }

        // paso 1: encontrar carro del cliente
        let carro = await Carrito.findOne({
            raw: true,
            where: {
                usuarioId: idCliente
            }
        });

        if (carro == null) throw new Error("No existe carrito asociado.");

        let idCarritoCliente = carro.id;

        // paso 2: encontrar detalle de productos en carro cliente
        let detalleProductos = await CarroProductos.findAll({
            raw: true,
            where: {
                carritoId: idCarritoCliente
            }
        });

        if (detalleProductos.length == 0) throw new Error("El cliente no tiene productos en el carro.");

        // paso 3: CREAR VENTA
        let nuevaVenta = await Venta.create({
            usuarioId: idCliente
        }, { transaction: t });

        let idVenta = nuevaVenta.dataValues.id;
        console.log(idVenta);

        // paso 4: DESCONTAR STOCK
        for (let index = 0; index < detalleProductos.length; index++) {
            let id = detalleProductos[index].productoId;
            let cantidad = detalleProductos[index].cantidad;
            const producto = await Producto.findOne({
                where: { id }
            });

            if (producto == null) {
                throw new Error("Un producto no existe.");
            }

            await producto.decrement({ stock: cantidad }, { transaction: t });

            // paso 5: INGRESAR PRODUCTOS VENDIDOS A LA TABLA DETALLE VENTAS
            const detalleVenta = await DetalleVenta.create({
                cantidad: cantidad,
                precio: producto.dataValues.precio,
                ventaId: idVenta,
                productoId: id
            }, { transaction: t });
        }

        // paso 6: VACIAR EL CARRO.
        await CarroProductos.destroy({
            where: {
                carritoId: idCarritoCliente
            }
        }, { transaction: t });

        await t.commit();
        res.status(201).json({ code: 201, message: "Venta generada correctamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, error: "Error al generar la venta." });
    }
}
