import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList.tsx';
import { Movie } from '../types/Movie.ts';
import SearchBar from '../components/SearchBar.tsx';
import Pagination from '../components/Pagination.tsx';
import '../components/LoadingSpinner.scss'
import axios from 'axios';

function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const moviesPerPage = 6; // Two rows with three items per row
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
    const [noResults, setNoResults] = useState<boolean>(false);

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    const LoadingSpinner = () => (
        <div className="loading-spinner">
            <div className="spinner"></div>
        </div>
    );

    const isValidImage = (url: string): Promise<boolean> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    };

    const fetchMovies = async (searchQuery: string = 'batman', showLoading: boolean = true) => {
        if (showLoading) {
            setIsLoading(true);
        }
        try {
            const response = await axios.get(
                `http://omdbapi.com/`, {
                params: {
                    s: searchQuery,
                    apikey: import.meta.env.VITE_OMDB_API_KEY
                }
            });
            const movies = response.data.Search || [];
            const moviesWithValidPosters = [];
            for (const movie of movies) {
                const isValid = await isValidImage(movie.Poster);
                if (isValid) {
                    moviesWithValidPosters.push(movie);
                }
            }
            setMovies(moviesWithValidPosters);
            setNoResults(moviesWithValidPosters.length === 0);
        } catch (error) {
            console.error('Error fetching movies:', error);
            setNoResults(true);
        } finally {
            if (showLoading) {
                setIsLoading(false);
            }
            setIsInitialLoad(false);
        }
    };

    useEffect(() => {
        fetchMovies('batman', true);
    }, []);

    return (
        <div>
            <SearchBar setMovies={setMovies} fetchMovies={(query) => fetchMovies(query, false)} />
            {isLoading && isInitialLoad ? (
                <LoadingSpinner />
            ) : (
                <>
                    {noResults ? (
                        <div>No results found</div>
                    ) : (
                        <>
                            <MovieList movies={currentMovies} />
                            <Pagination totalMovies={movies.length}
                                moviesPerPage={moviesPerPage}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Home;
