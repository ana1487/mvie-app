import express from 'express';
import { getFavourites, getFavouriteById, addFavourite, deleteFavourite } from '../controllers/favouritesController';

const router = express.Router();

// Define the routes
router.get('/api/favourites', getFavourites); // getting all favourites from the database
router.get('/api/favourites/:id', getFavouriteById); // getting single favourite item from the database
router.post('/api/favourites', addFavourite); // this adds the favourite into the database
router.delete('/api/favourites/:imdbID', deleteFavourite); // helps to delete one favourite from the list based on the imdbID

export default router;