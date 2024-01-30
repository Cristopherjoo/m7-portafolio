//categorias.routes.js
import express from 'express';
const router = express.Router();

import {getCategorias, addCategorias } from '../controllers/categorias.controller.js'

//Rutas
router.get('/categorias', getCategorias);
router.post('/categorias', addCategorias);
