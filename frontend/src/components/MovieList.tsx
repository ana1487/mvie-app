import React, { useState } from 'react';
import { Movie } from '../types/Movie.ts';
import './MovieList.scss';
import axios from 'axios';

interface MovieListProps {
    movies: Movie[];
}

const MovieList = (props: MovieListProps) => {
    const [favourites, setFavourites] = useState<Movie[]>([]);
    const [selectedMovieDetails, setSelectedMovieDetails] = useState<any>(null);

    const addfavFunc = (id: string) => {
        console.log(id);
        //This function will be used to add the movie to the favourite list
        //We will need to implement this function in the next step
        // setFavourites([...favourites, prop.movies.map((movie, index) => movie)]);
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
            console.log(response.data);

        } catch (error) {
            console.error("Error fetching movie details:", error);
        }


    }


    return (
        //added a div with a class name of movie-list-container to style the movie list
        // <div className='movie-list-container'>
        //     {/*We could also get rid of the props but its okay for now.  */}
        //     {props.movies.map((movie, index) => (
        //         <div key={index} className='movie-card' >
        //             <img onClick={() => openDetail(movie.imdbID)} src={movie.Poster} alt={`${movie.Title} poster`} />
        //             <button className="btn-fav" onClick={() => addfavFunc(movie.imdbID)}>Add to favourites</button> {/*This add to favourite button will be needed to add the movie to the favourite list*/}
        //         </div>
        //     ))}
        // </div>
        <div className='movie-list-container'>
            {props.movies.map((movie, index) => {
                const isMovieSelected = selectedMovieDetails?.imdbID === movie.imdbID;
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
                            <button
                                className="btn-fav"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering the image click event
                                    addfavFunc(movie.imdbID);
                                }}
                            >
                                Add to favourites
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );

}

export default MovieList;