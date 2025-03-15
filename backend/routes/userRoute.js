import express from 'express'
import { registerUser, loginUser, bookAppointment } from '../controllers/userController.js'


const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/book-appointment',authUser, bookAppointment)



export default userRouter