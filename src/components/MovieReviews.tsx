import React, { useState, useEffect } from 'react';
import { MessageCircle, Star, User, ChevronDown, ChevronUp } from 'lucide-react';
import { tmdbService, getImageUrl } from '../api/tmdb';

interface Review {
  id: string;
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: string;
  updated_at: string;
}

interface MovieReviewsProps {
  movieId: number;
}

const MovieReviews: React.FC<MovieReviewsProps> = ({ movieId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const movieReviews = await tmdbService.getMovieReviews(movieId);
        setReviews(movieReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  const toggleReviewExpansion = (reviewId: string) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="py-8">
        <div className="flex items-center space-x-3 mb-6">
          <MessageCircle className="h-6 w-6 text-blue-500 animate-spin" />
          <h2 className="text-2xl font-bold text-white">Memuat Ulasan...</h2>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="py-8">
        <div className="flex items-center space-x-3 mb-6">
          <MessageCircle className="h-6 w-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-white">Ulasan Pengguna</h2>
        </div>
        <div className="text-center py-8">
          <MessageCircle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">Belum ada ulasan untuk film ini</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="flex items-center space-x-3 mb-6">
        <MessageCircle className="h-6 w-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-white">Ulasan Pengguna</h2>
        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-sm">
          {reviews.length}
        </span>
      </div>

      <div className="space-y-6">
        {reviews.map(review => {
          const isExpanded = expandedReviews.has(review.id);
          const shouldShowToggle = review.content.length > 500;
          const displayContent = isExpanded || !shouldShowToggle 
            ? review.content 
            : review.content.substring(0, 500) + '...';

          return (
            <div key={review.id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {review.author_details.avatar_path ? (
                    <img
                      src={getImageUrl(review.author_details.avatar_path, 'w64')}
                      alt={review.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-white font-semibold">
                        {review.author_details.name || review.author}
                      </h4>
                      <p className="text-gray-400 text-sm">@{review.author_details.username}</p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {review.author_details.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-white font-medium">
                            {review.author_details.rating}/10
                          </span>
                        </div>
                      )}
                      <span className="text-gray-500 text-sm">
                        {formatDate(review.created_at)}
                      </span>
                    </div>
                  </div>

                  <div className="text-gray-300 leading-relaxed mb-4">
                    <p className="whitespace-pre-wrap">{displayContent}</p>
                  </div>

                  {shouldShowToggle && (
                    <button
                      onClick={() => toggleReviewExpansion(review.id)}
                      className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="h-4 w-4" />
                          <span>Tampilkan Lebih Sedikit</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4" />
                          <span>Baca Selengkapnya</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieReviews;