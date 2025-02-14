import { Request, Response } from "express";
import Favourite from "../models/Favourite";

// Getting all Favourites from the db using GET api/favourites
const getFavourites = async (req: Request, res: Response): Promise<void> => {
    try {
        const favourites = await Favourite.find({});
        res.json(favourites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

// Getting favourite by ID using GET /api/favourites/:id
const getFavouriteById = async (req: Request, res: Response): Promise<void> => {
    try {
        const favourite = await Favourite.findById(req.params.id);
        if (!favourite) {
            res.status(404).json({ message: 'Favourite not found' });
            return;
        }
        res.json(favourite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

// Adding a new favourite using POST call /api/favourites
const addFavourite = async (req: Request, res: Response): Promise<void> => {
    try {
        const { imdbID } = req.body;
        const existingFavourite = await Favourite.findOne({ imdbID });

        if (existingFavourite) {
            res.status(400).json({ message: 'Movie is already in favourites' });
            return;
        }
        const newFavourite = new Favourite(req.body);
        const savedFavourite = await newFavourite.save();
        res.status(201).json(savedFavourite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

// Deleting a favourite by imdbID using DELETE /api/favourites/:imdbID
const deleteFavourite = async (req: Request, res: Response): Promise<void> => {
    try {
        const favourite = await Favourite.findOneAndDelete({ imdbID: req.params.imdbID });
        if (!favourite) {
            res.status(404).json({ message: 'Favourite not found' });
            return;
        }
        res.json({ message: 'Favourite deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

export { getFavourites, getFavouriteById, addFavourite, deleteFavourite };
