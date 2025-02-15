import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import favouritesRouter from './routes/favourites';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/favourites', favouritesRouter); //there was a typo here. Might need to revert back to /api/favorites if code gets error...

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Default Route
// app.get('/', (req: Request, res: Response) => {
//     res.send('API is running...');
// });
app.use(favouritesRouter);

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

