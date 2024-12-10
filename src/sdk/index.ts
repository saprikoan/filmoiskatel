import { CardMovie } from './types/cardMovie';
import { baseUrl } from './hosts';
import axios from 'axios';
import { Movie } from './types/movie';
import { Review } from './types/review';

const instance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    }
})
export const sdk = {
    getMovies: async (search?: string): Promise<{data: CardMovie[]}> => {
        return await instance.get('/movies', {
            params: { search },
        });
    },
    getMovie: async (id: string): Promise<{data: Movie}> => {
        return await instance.get('/movie', {
            params: { id }
        })
    },
    getReviews: async (movieId: number): Promise<{data: Review[]}> => {
        return await instance.get('/reviews',{
            params: { movieId },
        })
    }
}
