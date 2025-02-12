export interface PaginationProps {
    totalMovies: number;
    moviesPerPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}