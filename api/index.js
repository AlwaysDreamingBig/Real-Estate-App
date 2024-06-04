import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

        {/** Database connexion */}

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(() => { 
    console.log('MongoDb is connected')
}).catch(err => {
    console.log(err);
});

const app = express();

            {/**this line is to enable the sending of JSON to the backend (firstly for authentification) */}
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000 ...');
    }
)

            {/** Creation of the route API for testing the back end*/}
        
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);