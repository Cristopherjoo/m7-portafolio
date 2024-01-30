import { Carrito } from '../models/Carro.model.js'
import { CarroProductos } from '../models/CarroProducto.model.js'
import { Producto } from '../models/Producto.model.js'

//gets
export const getCarrito = async (req, res) => {
    try {
        const carrito = await Carrito.findAll();
        res.json({ data: carrito });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, message: "Error al cargar el carrito.", error: error.message });
    }
};

export const addProductoCarro = async (req, res) => {
    try {
        // id cliente fijado, usuario con id 1
        let { id_cliente, id_producto } = req.body;
        let usuarioId = req.body.usuarioId || 1;

        const [carroCliente, created] = await Carrito.findOrCreate({
            raw: true,
            where: { usuarioId },
            defaults: { usuarioId }
        });

         const [carroConProductos, create2] = await CarroProductos.findOrCreate({
            where: {carritoId: carroCliente.id, productoId: id_producto },
            defaults: {
                carritoId: carroCliente.id,
                productoId: id_producto,
                cantidad: 1
            }
        })

        if(!create2){
            carroConProductos.increment({cantidad:1})
        }

        //validar si producto tiene stock suficiente
        let producto = await Producto.findByPk(id_producto);

        if(carroConProductos.cantidad > producto.stock){
            await carroConProductos.update({ cantidad: producto.stock }, {
                where: {
                  id: producto.id
                }
              });
            
            return res.status(201).json({message: "No hay más productos en stock."})
        }

<<<<<<< HEAD
        res.status(201).json({ message: "Producto agregado correctamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al agregar el producto al carro.", error: error.message });
    }
};
=======
        res.status(201).json({message: "Producto agregado correctamente."})

    }catch(error){
        console.log(error)
        res.status(500).json({message: "Error al agregar el producto al carro."})
    }
}
>>>>>>> 568d3d123f4675ddfb956acf56d0f09881611f5d

export const deleteProductoCarro = async (req, res) => {
    try{
        //id_cliente, id_producto, cantidad
        let {id_producto} = req.body;
        let idCliente = 1;
        const carroCliente = await Carrito.findOne({
            raw: true,
            where: {usuarioId: idCliente },
        })

         const carroConProductos= await CarroProductos.findOne({
            where: {carritoId: carroCliente.id, productoId: id_producto}
        });

        if(carroConProductos == null){
            return res.status(400).json({message: "El producto que intenta restar no existe."})
        }
    
        await carroConProductos.decrement({cantidad: 1})

        if(carroConProductos.dataValues.cantidad == 0){
            carroConProductos.destroy();
            return res.status(201).json({message: "Ha quitado todos los productos de ese tipo."})
        }


        res.status(201).json({message: "Producto Eliminado correctamente."})

    }catch(error){
        console.log(error)
        res.status(500).json({message: "Error al agregar el producto al carro."})
    }
}