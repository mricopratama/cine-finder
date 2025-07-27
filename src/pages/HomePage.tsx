import React, { useState } from 'react';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import { usePopularMovies } from '../hooks/useMovies';

const HomePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { movies, loading, error, totalPages } = usePopularMovies(currentPage);

  if (loading && movies.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Terjadi Kesalahan</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${movies[0]?.backdrop_path})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Cine-Finder
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Temukan film dan serial TV terbaik dengan fitur pencarian dan filter yang canggih
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/discover"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Jelajahi Film
            </Link>
            <Link
              to="/watchlist"
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold border border-gray-600 transition-all duration-200 hover:scale-105"
            >
              Lihat Watchlist
            </Link>
          </div>
        </div>
      </div>

      {/* Popular Movies Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-6 w-6 text-blue-500" />
            <h2 className="text-3xl font-bold text-white">Film Populer</h2>
          </div>
          <Link
            to="/discover"
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>Lihat Semua</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.min(totalPages, 20)} // Limit to 20 pages for better UX
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Features Section */}
      <div className="bg-gray-800/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Fitur Unggulan</h2>
            <p className="text-gray-400 text-lg">Pengalaman pencarian film yang tak terlupakan</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Pencarian Cerdas</h3>
              <p className="text-gray-400">Temukan film dengan pencarian real-time dan filter yang canggih</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">HD</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Detail Lengkap</h3>
              <p className="text-gray-400">Informasi komprehensif tentang cast, rating, dan trailer</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-pink-500 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">♥</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Personal Watchlist</h3>
              <p className="text-gray-400">Simpan film favorit Anda untuk ditonton nanti</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;