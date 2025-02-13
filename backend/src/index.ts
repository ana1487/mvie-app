import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import favoritesRouter from './routes/favourites.ts';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/favorites', favoritesRouter);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Default Route
app.get('/', (req: Request, res: Response) => {
    res.send('API is running...');
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
