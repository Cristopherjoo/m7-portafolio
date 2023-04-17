import {DataTypes} from 'sequelize';
import { sequelize } from '../database/bd.js'


export const Carrito = sequelize.define('carritos', {

},{
    timestamps: false
  });