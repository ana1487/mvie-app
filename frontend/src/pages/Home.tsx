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

    const fetchMovies = async (searchQuery: string = 'batman') => {
        try {
            const response = await axios.get(
                `http://omdbapi.com/`, {
                params: {
                    s: searchQuery,
                    apikey: import.meta.env.VITE_OMDB_API_KEY
                }
            });
            setMovies(response.data.Search || []);
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
