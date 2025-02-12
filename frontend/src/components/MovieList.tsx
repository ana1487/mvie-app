import React from 'react';
import { Movie } from '../types/Movie.ts';

interface MovieListProps {
    movies: Movie[];
}

const MovieList = (props: MovieListProps) => {
    return (
        <>
            {props.movies.map((movie, index) => (
                <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', borderRadius: '5px' }}>
                    <img src={movie.Poster} alt={`${movie.Title} poster`} style={{ width: '200px', height: '300px' }} />
                </div>
            ))}
        </>
    );
}

export default MovieList;
