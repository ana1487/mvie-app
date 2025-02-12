import React from 'react';
import './Pagination.scss';
import { PaginationProps } from '../types/Pagination.ts';


const Pagination = (props: PaginationProps) => {
    const totalPages = Math.ceil(props.totalMovies / props.moviesPerPage);

    //To handle how the content will be displayed on the page when the user clicks on previous button
    const handlePrev = () => {
        if (props.currentPage > 1) {
            props.setCurrentPage(props.currentPage - 1);
        }
    };
    // To handle how the conten will be diplayed when user clicks on the next button
    const handleNext = () => {
        if (props.currentPage < totalPages) {
            props.setCurrentPage(props.currentPage + 1);
        }
    };

    return (
        <div className='pagination'>
            <button onClick={handlePrev} disabled={props.currentPage === 1}>
                Prev
            </button>
            {[...Array(totalPages)].map((_, index) => ( //create an array of pages on basis of total pages
                <button
                    key={index}
                    className={props.currentPage === index + 1 ? 'active' : ''} //highlight the current page
                    onClick={() => props.setCurrentPage(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
            <button onClick={handleNext} disabled={props.currentPage === totalPages}>
                Next
            </button>
        </div>
    );
}

export default Pagination;


