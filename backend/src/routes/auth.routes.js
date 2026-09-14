import express from 'express'
import { getmeController, loginController, logoutController, registerController } from '../controllers/auth.controller.js'

const router = express.Router()

// router.post('/login', loginController)
// router.post('/register', registerController)
// router.post('/logout/:id', logoutController)
// router.post('/getme', getmeController)
// router.get('/refresh', )

export default router