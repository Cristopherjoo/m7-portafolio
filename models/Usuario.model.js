import {DataTypes} from 'sequelize';
import { sequelize } from '../database/bd.js'


export const Usuario = sequelize.define('usuarios', {
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,

        }
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isEmail:true
        }
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,

        }
    },
},{
    timestamps: false
  });