//app.js
import express from 'express';
import cors from 'cors';
import { create, engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Importación de rutas
import viewsRoutes from './routes/views.routes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


// Middleware de rutas
app.use(viewsRoutes);

const hbs =create({
    partialsDir:[
        'views/partiasl/'
    ],
})

// Configuración de express-handlebars
app.engine('hbs', engine({ extname: '.hbs' })); // Usamos la extensión '.hbs' para las vistas
app.set('view engine', 'hbs'); // Establecemos el motor de vistas como 'hbs'
app.set('views', './views');

export default app;