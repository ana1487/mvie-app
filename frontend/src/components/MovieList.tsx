import React from 'react';
import { Movie } from '../types/Movie.ts';
import './MovieList.scss';

interface MovieListProps {
    movies: Movie[];
}

const MovieList = (props: MovieListProps) => {
    return (
        //added a div with a class name of movie-list-container to style the movie list
        <div className='movie-list-container'>
            {/*We could also get rid of the props but its okay for now.  */}
            {props.movies.map((movie, index) => (
                <div key={index} className='movie-card' >
                    <img src={movie.Poster} alt={`${movie.Title} poster`} />
                </div>
            ))}
        </div>
    );
}

export default MovieList;
