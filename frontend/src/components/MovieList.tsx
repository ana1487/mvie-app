import React, { useState } from 'react';
import { Movie } from '../types/Movie.ts';
import './MovieList.scss';

interface MovieListProps {
    movies: Movie[];
}

const MovieList = (props: MovieListProps) => {
    const [favourites, setFavourites] = useState<Movie[]>([]);

    const addfavFunc = () => {
        //This function will be used to add the movie to the favourite list
        //We will need to implement this function in the next step
        // setFavourites([...favourites, prop.movies.map((movie, index) => movie)]);
    }

    const openDetail = () => {
        //This function will basically pull the information of the movie and display it in a modal
        //will need to do api call to OMDB here.
    }

    return (
        //added a div with a class name of movie-list-container to style the movie list
        <div className='movie-list-container'>
            {/*We could also get rid of the props but its okay for now.  */}
            {props.movies.map((movie, index) => (
                <div key={index} className='movie-card' >
                    <img onClick={openDetail} src={movie.Poster} alt={`${movie.Title} poster`} />
                    <button className="btn-fav" onClick={addfavFunc}>Add to favourites</button> {/*This add to favourite button will be needed to add the movie to the favourite list*/}
                </div>
            ))}
        </div>
    );
}

export default MovieList;