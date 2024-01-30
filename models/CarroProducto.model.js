import {DataTypes} from 'sequelize';
import { sequelize } from '../database/bd.js'

export const CarroProductos = sequelize.define('carro_productos', {
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull:false,
        validate: {
            notEmpty: true,
            min: 0
        }
    }
},{
    timestamps: false
  });