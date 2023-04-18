import express from 'express';
const router = express.Router();

import {getCategorias, addCategorias } from '../controllers/categorias.controller.js'

//Rutas
router.get('/categorias', getCategorias, (req, res) =>{});
router.post('/categorias', addCategorias, (req, res) =>{});

export default router;