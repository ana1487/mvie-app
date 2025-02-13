import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList.tsx';
import { Movie } from '../types/Movie.ts';
import SearchBar from '../components/SearchBar.tsx';
import Pagination from '../components/Pagination.tsx';
import axios from 'axios';

function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const moviesPerPage = 6; // Two rows with three items per row

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    //This will only add movies with valid link for posters
    //Challenge: I have to understand how Promise works in order to understand this function fulyl
    const isValidImage = (url: string): Promise<boolean> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    };

    //Fecth movies from omdbapi won't guarantee there's gonna be 10 results because we will filter out movies without valid posters
    const fetchMovies = async (searchQuery: string = 'batman') => {
        try {
            const response = await axios.get(
                `http://omdbapi.com/`, {
                params: {
                    s: searchQuery,
                    apikey: import.meta.env.VITE_OMDB_API_KEY
                }
            });
            const movies = response.data.Search || [];
            //Will have to filter if there is a poster image that works first
            const moviesWithValidPosters = [];
            for (const movie of movies) {
                const isValid = await isValidImage(movie.Poster);
                if (isValid) {
                    moviesWithValidPosters.push(movie);
                }
            }
            setMovies(moviesWithValidPosters); //only setting movies with valid posters as our app relies on poster to showcase movies
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div>
            <SearchBar setMovies={setMovies} fetchMovies={fetchMovies} />
            <MovieList movies={currentMovies} />
            <Pagination totalMovies={movies.length}
                moviesPerPage={moviesPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}

export default Home;
