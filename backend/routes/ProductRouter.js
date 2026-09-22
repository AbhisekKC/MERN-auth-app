import express from 'express'
import {ensureAuth} from '../middlewares/Auth.js'
const router = express.Router();


// post 

router.get('/', ensureAuth , (req, res) =>{
    console.log('...... logged in user details' , req.user);
    res.status(200).json([
        
       {name:'mobile',
        price: 10000} ,
        {name:'tv',
        price: 40000}
     ])
}  )



export default router;