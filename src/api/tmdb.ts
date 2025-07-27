import axios from 'axios';
import { Movie, Genre, CastMember, Video } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'id-ID',
  },
});

export const getImageUrl = (path: string, size: string = 'w500') => {
  if (!path) return 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=500';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const tmdbService = {
  // Get popular movies
  getPopularMovies: async (page: number = 1): Promise<{ results: Movie[]; total_pages: number }> => {
    const response = await tmdbApi.get('/movie/popular', { params: { page } });
    return {
      results: response.data.results.map((movie: any) => ({
        ...movie,
        poster_path: getImageUrl(movie.poster_path),
        backdrop_path: getImageUrl(movie.backdrop_path, 'w1280'),
      })),
      total_pages: response.data.total_pages,
    };
  },

  // Get trending movies
  getTrendingMovies: async (timeWindow: 'day' | 'week' = 'week'): Promise<Movie[]> => {
    const response = await tmdbApi.get(`/trending/movie/${timeWindow}`);
    return response.data.results.map((movie: any) => ({
      ...movie,
      poster_path: getImageUrl(movie.poster_path),
      backdrop_path: getImageUrl(movie.backdrop_path, 'w1280'),
    }));
  },

  // Search movies
  searchMovies: async (query: string, page: number = 1): Promise<{ results: Movie[]; total_pages: number }> => {
    const response = await tmdbApi.get('/search/movie', { 
      params: { query, page } 
    });
    return {
      results: response.data.results.map((movie: any) => ({
        ...movie,
        poster_path: getImageUrl(movie.poster_path),
        backdrop_path: getImageUrl(movie.backdrop_path, 'w1280'),
      })),
      total_pages: response.data.total_pages,
    };
  },

  // Discover movies with filters
  discoverMovies: async (filters: {
    sort_by?: string;
    with_genres?: string;
    primary_release_year?: number;
    'vote_average.gte'?: number;
    page?: number;
  }): Promise<{ results: Movie[]; total_pages: number }> => {
    const response = await tmdbApi.get('/discover/movie', { params: filters });
    return {
      results: response.data.results.map((movie: any) => ({
        ...movie,
        poster_path: getImageUrl(movie.poster_path),
        backdrop_path: getImageUrl(movie.backdrop_path, 'w1280'),
      })),
      total_pages: response.data.total_pages,
    };
  },

  // Get movie details
  getMovieDetails: async (movieId: number): Promise<Movie> => {
    const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'credits,videos,similar,reviews',
      },
    });
    
    const movie = response.data;
    const youtubeVideos = movie.videos?.results?.filter(
      (video: any) => video.site === 'YouTube'
    ) || [];
    return {
      ...movie,
      poster_path: getImageUrl(movie.poster_path),
      backdrop_path: getImageUrl(movie.backdrop_path, 'w1280'),
      credits: {
        cast: movie.credits.cast.slice(0, 20).map((actor: any) => ({
          ...actor,
          profile_path: getImageUrl(actor.profile_path, 'w185'),
        })),
      },
      videos: {
        results: youtubeVideos,
      },
    };
  },

  // Get genres
  getGenres: async (): Promise<Genre[]> => {
    const response = await tmdbApi.get('/genre/movie/list');
    return response.data.genres;
  },

  // Get movie videos
  getMovieVideos: async (movieId: number): Promise<Video[]> => {
    const response = await tmdbApi.get(`/movie/${movieId}/videos`, {
      params: {
        language: 'en-US'
      }
    });
    return response.data.results.filter((video: any) => video.site === 'YouTube');
  },

  // Get similar movies
  getSimilarMovies: async (movieId: number): Promise<Movie[]> => {
    const response = await tmdbApi.get(`/movie/${movieId}/similar`);
    return response.data.results.slice(0, 12).map((movie: any) => ({
      ...movie,
      poster_path: getImageUrl(movie.poster_path),
      backdrop_path: getImageUrl(movie.backdrop_path, 'w1280'),
    }));
  },

  // Get movie reviews
  getMovieReviews: async (movieId: number): Promise<any[]> => {
    const response = await tmdbApi.get(`/movie/${movieId}/reviews`);
    return response.data.results.slice(0, 5);
  },
};