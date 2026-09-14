import express from 'express'
import { createUrlController, getAllUrlController } from '../controllers/url.controller.js'

const router = express.Router()

router.post('/create', createUrlController)
router.get('/getall', getAllUrlController)

export default router