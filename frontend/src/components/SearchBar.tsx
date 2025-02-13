import React, { useState, useEffect } from 'react';
import './SearchBar.scss';
import { SearchBarProps } from '../types/SearchBarProps';



const SearchBar = (props: SearchBarProps) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const delayCall = setTimeout(() => {
            if (query) {
                props.fetchMovies(query);
            }
        }, 700);
        return () => clearTimeout(delayCall);
    }, [query, props.fetchMovies]);

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
