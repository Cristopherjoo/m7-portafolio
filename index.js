// index.js, archivo principal arranca aplicacion
'use strict'
import app from './app.js'
import { sequelize } from './database/bd.js'
import './models/Producto.model.js'

//Funcion principal de asincronia
const main = async () => {
    try {
        await sequelize.authenticate()
        console.log('Coneccion establecida con exito')
        await sequelize.sync({force:false})
        let PORT = process.env.PORT || 3000
        app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`))
    } catch (error) {
        console.log("Ha ocurrido un error en el servidor ", error)
    }
}
main()