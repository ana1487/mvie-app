import React, { useState, useEffect } from 'react';
import { Movie } from '../types/Movie.ts';

import './MovieList.scss';
import axios from 'axios';

interface MovieListProps {
    movies: Movie[];
    removeFavFunc?: (imdbID: string) => void;
}

const MovieList = (props: MovieListProps) => {
    const [selectedMovieDetails, setSelectedMovieDetails] = useState<any>(null);
    const [addedFavourites, setAddedFavourites] = useState<Set<string>>(new Set());

    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/favourites`);
                const favouriteMovies = response.data;
                const favouriteMovieIDs: Set<string> = new Set(favouriteMovies.map((movie: Movie) => movie.imdbID));
                setAddedFavourites(favouriteMovieIDs);
            } catch (error) {
                console.error('Error fetching favourite movies:', error);
            }
        };

        fetchFavourites();
    }, []);

    const addfavFunc = async (movie: Movie) => {
        console.log(movie);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/favourites`, movie);
            //console.log('Movie added to favourites:', response.data);
            console.log('no errors while uploading into your favourites')
            setAddedFavourites(new Set(addedFavourites).add(movie.imdbID));
        } catch (error) {
            console.error('Error adding movie to favourites:', error);
        }
    }

    const openDetail = async (id: string) => {
        //This function will basically pull the information of the movie and display it in a modal
        //will need to do api call to OMDB here.
        try {
            const response = await axios.get(`http://omdbapi.com/`, {
                params: {
                    i: id,
                    apikey: import.meta.env.VITE_OMDB_API_KEY
                }
            });
            setSelectedMovieDetails(response.data);
            // console.log(response.data);
            console.log("The movie details are being fetched well")

        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    }


    return (
        <div className='movie-list-container'>
            {props.movies.map((movie, index) => {
                const isMovieSelected = selectedMovieDetails?.imdbID === movie.imdbID;
                const isAddedToFavourites = addedFavourites.has(movie.imdbID);
                return (
                    <div key={index} className="movie-card">
                        {/* Image container */}
                        <div
                            className={`movie-image ${isMovieSelected ? 'blurred' : ''}`}
                            onClick={() => openDetail(movie.imdbID)}
                        >
                            <img src={movie.Poster} alt={`${movie.Title} poster`} />
                            {/* Overlay movie details */}
                            {isMovieSelected && (
                                <div className="movie-details-overlay">
                                    <div className="movie-header">
                                        <h2>{selectedMovieDetails.Title}</h2>
                                        <p className="tagline">{selectedMovieDetails.Year} | {selectedMovieDetails.Rated} | {selectedMovieDetails.Runtime}</p>
                                    </div>
                                    <div className="movie-info">
                                        <div className='movie-details'>
                                            <p><strong>Released:</strong> {selectedMovieDetails.Released}</p>
                                            <p><strong>Genre:</strong> {selectedMovieDetails.Genre}</p>
                                            <p><strong>Director:</strong> {selectedMovieDetails.Director}</p>
                                            <p><strong>Writer:</strong> {selectedMovieDetails.Writer}</p>
                                            <p><strong>Actors:</strong> {selectedMovieDetails.Actors}</p>
                                            <p><strong>Plot:</strong> {selectedMovieDetails.Plot}</p>
                                            <p><strong>Language:</strong> {selectedMovieDetails.Language}</p>
                                            <p><strong>Country:</strong> {selectedMovieDetails.Country}</p>
                                            <p><strong>Awards:</strong> {selectedMovieDetails.Awards}</p>
                                        </div>
                                        <div className='movie-ratings'>
                                            <h3>Ratings</h3>
                                            {selectedMovieDetails.Ratings.map((rating: { Source: string; Value: string }, index: number) => (
                                                <p key={index}><strong>{rating.Source}:</strong> {rating.Value}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Add to favourites button */}
                            {props.removeFavFunc ? (
                                <button
                                    className="btn-fav remove-fav"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        props.removeFavFunc!(movie.imdbID);
                                    }}
                                >
                                    Remove from Favourites
                                </button>
                            ) : (
                                isAddedToFavourites ? (
                                    <button className="btn-fav in-favourites">
                                        In your Favourites
                                    </button>
                                ) : (
                                    <button
                                        className="btn-fav"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering the image click event
                                            addfavFunc(movie)
                                        }}
                                    >
                                        Add to Favourites
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );

}

export default MovieList;