//producto.model.js
import { DataTypes } from "sequelize"
import { sequelize } from "../database/bd.js"

export const producto = sequelize.define('productos',{
    nombre: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    precio: {
        type: DataTypes.DECIMAL
    }, 
    stock: {
        type: DataTypes.INTEGER
    }

})