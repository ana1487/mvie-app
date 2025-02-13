import React, { useState, useEffect, useCallback } from 'react';
import './SearchBar.scss';
import { SearchBarProps } from '../types/SearchBarProps';

const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const SearchBar = (props: SearchBarProps) => {
    const [query, setQuery] = useState('');
    const debouncedFetchMovies = useCallback(debounce(props.fetchMovies, 500), [props.fetchMovies]);

    useEffect(() => {
        if (query) {
            debouncedFetchMovies(query);
        }
    }, [query, debouncedFetchMovies]);

    return (
        <div className='search'>
            <input
                type="text"
                placeholder="Search for a movie..."
                className='search__input'
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
            />
        </div>
    );
}

export default SearchBar;
