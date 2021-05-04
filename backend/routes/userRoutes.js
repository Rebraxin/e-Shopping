import express from 'express'
import { authUser } from '../controllers/userController.js'
import { getUserProfile } from '../controllers/userController.js'
import { updateUserProfile } from '../controllers/userController.js'
import { registerUser } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
