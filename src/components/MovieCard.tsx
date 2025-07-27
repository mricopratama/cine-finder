import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Calendar, Plus, Check } from 'lucide-react';
import { Movie } from '../types/movie';
import { useWatchlist } from '../context/WatchlistContext';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(movie.id);

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const getGenreNames = () => {
    return movie.genres?.slice(0, 2).map(genre => genre.name).join(', ') || '';
  };

  return (
    <div className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
      <Link to={`/movie/${movie.id}`}>
        {/* Poster Image */}
        <div className="aspect-[2/3] relative overflow-hidden">
          <img
            src={movie.poster_path}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Rating Badge */}
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-white text-xs font-medium">{movie.vote_average.toFixed(1)}</span>
          </div>

          {/* Watchlist Button */}
          <button
            onClick={handleWatchlistToggle}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              inWatchlist
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-black/50 text-white hover:bg-black/70'
            }`}
          >
            {inWatchlist ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </button>
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>
            <span className="text-yellow-400">{movie.vote_count.toLocaleString()} votes</span>
          </div>

          <div className="text-sm text-gray-300 mb-3">
            {getGenreNames()}
          </div>

          <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
            {movie.overview}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;