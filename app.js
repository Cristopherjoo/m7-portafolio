//app.js
import express from 'express';
import cors from 'cors';
import { create, engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Importación de rutas
import viewsRoutes from './routes/views.routes.js';
import productosRoutes from './routes/productos.routes.js'

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


// Middleware de rutas
app.use(viewsRoutes);
app.use('/api/v1/', productosRoutes);

const hbs =create({
    partialsDir:[
        'views/partiasl/'
    ],
})

// Configuración de express-handlebars
app.engine('hbs', engine({ extname: '.hbs' })); 
app.set('view engine', 'hbs'); 
app.set('views', './views');

export default app;

