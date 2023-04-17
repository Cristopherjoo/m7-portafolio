import {DataTypes} from 'sequelize';
import { sequelize } from '../database/bd.js'

export const Producto = sequelize.define('productos', {
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    descripcion: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
            notEmpty: true
        }
        
    },
    precio: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    }
},{
    timestamps: false
  });