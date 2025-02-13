import React, { useState, useEffect } from 'react';
import './SearchBar.scss';
import { Movie } from '../types/Movie';

interface SearchBarProps {
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
    fetchMovies: (searchQuery: string) => Promise<void>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setMovies, fetchMovies }) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const delayCall = setTimeout(() => {
            if (query) {
                fetchMovies(query);
            }
        }, 700);
        return () => clearTimeout(delayCall);
    }, [query, fetchMovies]);

    return (
        <div className='search'>
            <input
                type="text"
                placeholder="Search for a movie..."
                className='search__input'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;
