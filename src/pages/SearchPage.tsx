import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import { useSearchMovies } from '../hooks/useMovies';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [currentPage, setCurrentPage] = useState(1);
  const { movies, loading, error, totalPages } = useSearchMovies(query, currentPage);

  if (!query.trim()) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <Search className="h-24 w-24 text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-white mb-4">Mulai Pencarian</h2>
            <p className="text-gray-400">Masukkan kata kunci di kolom pencarian untuk menemukan film</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Hasil Pencarian untuk "{query}"
          </h1>
          <p className="text-gray-400">
            {loading ? 'Mencari...' : error ? 'Terjadi kesalahan' : `Ditemukan ${movies.length} film`}
          </p>
        </div>

        {error && (
          <div className="text-center py-20">
            <Search className="h-24 w-24 text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-white mb-4">Terjadi Kesalahan</h2>
            <p className="text-gray-400">{error}</p>
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : !error && movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : !error && (
          <div className="text-center py-20">
            <Search className="h-24 w-24 text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-white mb-4">Tidak Ada Hasil</h2>
            <p className="text-gray-400">
              Tidak ditemukan film dengan kata kunci "{query}". Coba dengan kata kunci lain.
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
  );
};

export default SearchPage;