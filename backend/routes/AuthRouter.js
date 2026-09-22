import express from 'express'
import { signup , login } from '../controller/AuthController.js';
import { signupValidation , loginValidation} from '../middlewares/AuthValidation.js';

const router = express.Router();


// post 

router.post('/login',loginValidation, login )

router.post('/signup', signupValidation , signup )

export default router;