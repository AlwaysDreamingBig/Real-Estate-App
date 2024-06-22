import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';

        {/** Database connexion */}

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() => { 
    console.log('MongoDb is connected')
}).catch(err => {
    console.log(err);
});

const app = express();

const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

app.use(cors(corsOptions));

            {/**this line is to enable the sending of JSON to the backend (firstly for authentification) */}
app.use(express.json());

             {/**this line is to enable sending request between different domains  */}

             {/**this line is to use cookieParser  */}
app.use(cookieParser());

            {/** Creation of the route API for testing the back end*/}
        
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/listing', listingRouter);


            {/** Middleware to handle errors
                err is is the error goot from the input
                req is the request
                res is the response
                next is the var used to get to the next middleware */}
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000 ...');
    }
)