import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, Clock, Plus, Check, Users } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';
import LoadingSpinner from '../components/LoadingSpinner';
import TrailerButton from '../components/TrailerButton';
import SimilarMovies from '../components/SimilarMovies';
import MovieReviews from '../components/MovieReviews';
import { useMovieDetails } from '../hooks/useMovies';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { movie, loading, error } = useMovieDetails(id ? parseInt(id) : 0);

  const handleBackClick = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            {error ? 'Terjadi Kesalahan' : 'Film Tidak Ditemukan'}
          </h2>
          {error && (
            <p className="text-gray-400 mb-4">{error}</p>
          )}
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const inWatchlist = isInWatchlist(movie.id);

  const handleWatchlistToggle = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.backdrop_path})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="absolute top-8 left-8 z-20 flex items-center space-x-2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-black/70 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali</span>
        </button>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-col lg:flex-row items-start lg:items-end space-y-8 lg:space-y-0 lg:space-x-8">
              {/* Poster */}
              <div className="flex-shrink-0">
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="w-64 h-96 object-cover rounded-xl shadow-2xl"
                />
              </div>

              {/* Movie Info */}
              <div className="flex-1 text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
                
                {movie.tagline && (
                  <p className="text-xl text-gray-300 italic mb-6">"{movie.tagline}"</p>
                )}

                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-semibold">{movie.vote_average.toFixed(1)}</span>
                    <span className="text-gray-400">({movie.vote_count.toLocaleString()} votes)</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                  
                  {movie.runtime && (
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span>{movie.runtime} menit</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres?.map(genre => (
                    <span
                      key={genre.id}
                      className="bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl">
                  {movie.overview}
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <TrailerButton 
                    movieId={movie.id} 
                    movieTitle={movie.title}
                  />

                <button
                  onClick={handleWatchlistToggle}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 ${
                    inWatchlist
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {inWatchlist ? (
                    <>
                      <Check className="h-5 w-5" />
                      <span>Sudah di Watchlist</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" />
                      <span>Tambah ke Watchlist</span>
                    </>
                  )}
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      {movie.credits?.cast && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center space-x-3 mb-8">
            <Users className="h-6 w-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-white">Pemeran</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movie.credits.cast.slice(0, 12).map(actor => (
              <div key={actor.id} className="text-center">
                <div className="aspect-[2/3] mb-3 overflow-hidden rounded-lg bg-gray-800">
                  <img
                    src={actor.profile_path}
                    alt={actor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-white font-medium text-sm mb-1">{actor.name}</h3>
                <p className="text-gray-400 text-xs">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Similar Movies */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SimilarMovies movieId={movie.id} />
      </div>

      {/* Reviews */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MovieReviews movieId={movie.id} />
      </div>

      {/* Stats Section */}
      <div className="bg-gray-800/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {movie.vote_average.toFixed(1)}
              </div>
              <div className="text-gray-400">Rating IMDb</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {movie.vote_count.toLocaleString()}
              </div>
              <div className="text-gray-400">Total Votes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-400 mb-2">
                {movie.runtime || 120}
              </div>
              <div className="text-gray-400">Durasi (menit)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;