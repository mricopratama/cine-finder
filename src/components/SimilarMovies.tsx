import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Film } from 'lucide-react';
import { tmdbService } from '../api/tmdb';
import { Movie } from '../types/movie';
import MovieCard from './MovieCard';

interface SimilarMoviesProps {
  movieId: number;
}

const SimilarMovies: React.FC<SimilarMoviesProps> = ({ movieId }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      setLoading(true);
      try {
        const similarMovies = await tmdbService.getSimilarMovies(movieId);
        setMovies(similarMovies);
      } catch (error) {
        console.error('Error fetching similar movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarMovies();
  }, [movieId]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, movies.length - 5));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, movies.length - 5)) % Math.max(1, movies.length - 5));
  };

  if (loading) {
    return (
      <div className="py-8">
        <div className="flex items-center space-x-3 mb-6">
          <Film className="h-6 w-6 text-blue-500 animate-spin" />
          <h2 className="text-2xl font-bold text-white">Memuat Film Serupa...</h2>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Film className="h-6 w-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-white">Film Serupa</h2>
        </div>
        
        {movies.length > 6 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={prevSlide}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-white transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out gap-4"
          style={{ transform: `translateX(-${currentIndex * (100 / 6)}%)` }}
        >
          {movies.map(movie => (
            <div key={movie.id} className="flex-shrink-0 w-48">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarMovies;