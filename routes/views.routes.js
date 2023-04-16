//views.routes.js

import express from 'express'
const router = express.Router()
import { controllerHome } from '../controllers/views.controller.js'

router.get(['/', 'home'], controllerHome, (req,res) => {
    
})

export default router