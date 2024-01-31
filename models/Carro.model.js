import { DataTypes } from 'sequelize'
import { sequelize } from '../database/bd.js'

export const Carrito = sequelize.define('carritos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },   
}, {
    timestamps: false
});
export default Carrito