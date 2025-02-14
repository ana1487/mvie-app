import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList.tsx';
import { Movie } from '../types/Movie.ts';
import axios from 'axios';

function Favourites() {
    const [favouriteMovies, setFavouriteMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [noResults, setNoResults] = useState<boolean>(false);

    useEffect(() => {
        const fetchFavouriteMovies = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/favourites`);
                const movies = response.data;
                setFavouriteMovies(movies);
                setNoResults(movies.length === 0);
            } catch (error) {
                console.error('Error fetching favourite movies:', error);
                setNoResults(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavouriteMovies();
    }, []);

    const removeFavFunc = async (imdbID: string) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/favourites/${imdbID}`);
            setFavouriteMovies(favouriteMovies.filter(movie => movie.imdbID !== imdbID));
        } catch (error) {
            console.error('Error removing movie from favourites:', error);
        }
    };

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {noResults ? (
                        <div>No favourite movies found</div>
                    ) : (
                        <MovieList movies={favouriteMovies} removeFavFunc={removeFavFunc} />
                    )}
                </>
            )}
        </div>
    );
}

export default Favourites;