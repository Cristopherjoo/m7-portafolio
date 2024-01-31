import {DataTypes} from 'sequelize'
import { sequelize } from '../database/bd.js'

export const DetalleVenta = sequelize.define('detalle_ventas', {
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull:false,
        validate: {
            notEmpty: true,
            min: 0,
            isNumeric: true
        }
    },
    precio:{
        type: DataTypes.DECIMAL,
        allowNull:false,
        validate: {
            notEmpty: true,
            min: 0,
            isDecimal: true
        }
    }
},{
    timestamps: false
  });

