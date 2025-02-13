import { Movie } from './Movie';

export interface SearchBarProps {
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
    fetchMovies: (searchQuery: string) => Promise<void>;
}