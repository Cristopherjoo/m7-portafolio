import {DataTypes} from 'sequelize'
import { sequelize } from '../database/bd.js'


  export const Venta = sequelize.define('ventas', {
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
            notEmpty: true,
            isDate: true
        }
    },
},{
    timestamps: false
  });
