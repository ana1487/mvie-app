import React, { useState, useEffect } from 'react';
import './SearchBar.scss';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    useEffect(() => {
        const delayCall = setTimeout(() => {
            if (query) { //Check if the query is not empty before making the api call
                console.log(`Checking for the movie with this query: ${query}`);
                //Will make api call here, check the movie with the query and display the result
            }
        }, 500); //each 500ms, the api call will make the request as long as the query is not empty
        return () => clearTimeout(delayCall); //Clear the timeout and make the api call again if needed
    }, [query]);

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
