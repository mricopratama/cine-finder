import React, { useState } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import { SearchFilters } from '../types/movie';
import { useDiscoverMovies, useGenres } from '../hooks/useMovies';

const DiscoverPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    sortBy: 'popularity.desc',
    genres: [],
    yearRange: [1990, 2024],
    minRating: 0
  });

  const { genres } = useGenres();
  
  // Prepare filters for API
  const apiFilters = {
    sort_by: filters.sortBy,
    with_genres: filters.genres.length > 0 ? filters.genres.join(',') : undefined,
    primary_release_year: filters.yearRange[1] === 2024 ? undefined : filters.yearRange[1],
    'vote_average.gte': filters.minRating > 0 ? filters.minRating : undefined,
    page: currentPage,
  };

  const { movies, loading, error, totalPages } = useDiscoverMovies(apiFilters);

  const handleGenreToggle = (genreId: number) => {
    setCurrentPage(1); // Reset to first page when filters change
    setFilters(prev => ({
      ...prev,
      genres: prev.genres.includes(genreId)
        ? prev.genres.filter(id => id !== genreId)
        : [...prev.genres, genreId]
    }));
  };

  const handleYearRangeChange = (index: number, value: number) => {
    setCurrentPage(1);
    setFilters(prev => ({
      ...prev,
      yearRange: prev.yearRange.map((year, i) => i === index ? value : year) as [number, number]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Jelajahi Film</h1>
            <p className="text-gray-400">
              {loading ? 'Memuat...' : error ? 'Terjadi kesalahan' : `Menampilkan ${movies.length} film`}
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mt-4 sm:mt-0 flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filter</span>
          </button>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 space-y-6`}>
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filter
              </h3>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Urutkan Berdasarkan
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => {
                    setCurrentPage(1);
                    setFilters(prev => ({ ...prev, sortBy: e.target.value }));
                  }}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="popularity.desc">Popularitas (Tinggi ke Rendah)</option>
                  <option value="vote_average.desc">Rating (Tinggi ke Rendah)</option>
                  <option value="release_date.desc">Tanggal Rilis (Terbaru)</option>
                  <option value="title.asc">Judul (A-Z)</option>
                </select>
              </div>

              {/* Genres */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Genre
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {genres.map(genre => (
                    <button
                      key={genre.id}
                      onClick={() => handleGenreToggle(genre.id)}
                      className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        filters.genres.includes(genre.id)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Tahun Rilis: {filters.yearRange[0]} - {filters.yearRange[1]}
                </label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Dari</label>
                    <input
                      type="range"
                      min="1900"
                      max="2024"
                      value={filters.yearRange[0]}
                      onChange={(e) => handleYearRangeChange(0, parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Sampai</label>
                    <input
                      type="range"
                      min="1900"
                      max="2024"
                      value={filters.yearRange[1]}
                      onChange={(e) => handleYearRangeChange(1, parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Minimum Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Rating Minimal: {filters.minRating.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={filters.minRating}
                  onChange={(e) => {
                    setCurrentPage(1);
                    setFilters(prev => ({ ...prev, minRating: parseFloat(e.target.value) }));
                  }}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Movies Grid */}
          <div className="flex-1">
            {error && (
              <div className="text-center py-20">
                <Filter className="h-24 w-24 text-gray-600 mx-auto mb-6" />
                <h2 className="text-2xl font-semibold text-white mb-4">Terjadi Kesalahan</h2>
                <p className="text-gray-400">{error}</p>
              </div>
            )}

            {loading ? (
              <LoadingSpinner />
            ) : !error && movies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {movies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : !error && (
              <div className="text-center py-20">
                <Filter className="h-24 w-24 text-gray-600 mx-auto mb-6" />
                <h2 className="text-2xl font-semibold text-white mb-4">Tidak Ada Film</h2>
                <p className="text-gray-400">
                  Tidak ditemukan film dengan filter yang dipilih. Coba ubah kriteria pencarian.
                </p>
              </div>
            )}

            {!loading && !error && movies.length > 0 && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={Math.min(totalPages, 20)}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;