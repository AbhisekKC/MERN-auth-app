import express, { Router } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRouter from './routes/AuthRouter.js';
import productRouter from './routes/ProductRouter.js'


dotenv.config();

const app = express();

// PORT and databaseURL
const PORT = process.env.PORT || 8000;
const mongo_url = process.env.MONGOURL;

//middlewares

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRouter)
app.use('/products' ,productRouter )


// connect to database and listen to server

mongoose.connect(mongo_url)
    .then(
        () => {
            app.listen(PORT, () => {
                console.log(`Server is running on : ${PORT}`)
            })
            console.log('Mongo Database connected successfully!')
        }
    ).catch(
        (err) => {
            console.log(err)
        }
    )