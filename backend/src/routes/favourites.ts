import express from 'express';
import { getFavourites, getFavouriteById, addFavourite, deleteFavourite } from '../controllers/favouritesController';

const router = express.Router();

//Define the routes
router.get('/api/favourites', getFavourites); //getting all favourites from the database
router.get('/api/favourites/:id', getFavouriteById); //gettting single favourtie item from the database
router.post('/api/favourites', addFavourite); //this adds the favourite into thed database
router.delete('/api/favourites/:id', deleteFavourite); //Helps to delete one favourite from the list based on the id


export default router;