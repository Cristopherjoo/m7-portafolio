import Sequelize from 'sequelize'
export const sequelize = new Sequelize('m7-Ecommerce', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres'
}) 