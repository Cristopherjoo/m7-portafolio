import Sequelize from 'sequelize'
export const sequelize = new Sequelize('m7-Ecommerce', 'postgres', '12345', {
    host: 'localhost',
    dialect: 'postgres'
}) 