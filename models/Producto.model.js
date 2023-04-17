//producto.model.js
import { DataTypes } from "sequelize"
import { sequelize } from "../database/bd.js"

export const Producto = sequelize.define('productos',{
    nombre: {
        type: DataTypes.STRING(100) 
    },
    descripcion: {
        type: DataTypes.STRING(350)
    },
    categoria: {
        type: DataTypes.STRING(60)
    },
    precio: {
        type: DataTypes.INTEGER
    }, 
    stock: {
        type: DataTypes.INTEGER
    }
        
},{
    timestamps: true
})