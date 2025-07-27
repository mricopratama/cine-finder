import React, { useState, useEffect } from 'react';
import { Play, Film } from 'lucide-react';
import { tmdbService } from '../api/tmdb';
import { Video } from '../types/movie';
import VideoPlayer from './VideoPlayer';

interface TrailerButtonProps {
  movieId: number;
  movieTitle: string;
  className?: string;
}

const TrailerButton: React.FC<TrailerButtonProps> = ({ movieId, movieTitle, className = '' }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const movieVideos = await tmdbService.getMovieVideos(movieId);
        setVideos(movieVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [movieId]);

  const trailer = videos.find(video => 
    video.type === 'Trailer' || video.type === 'Teaser'
  );

  if (loading) {
    return (
      <button
        disabled
        className={`flex items-center space-x-2 bg-gray-600 text-gray-400 px-4 py-2 rounded-lg cursor-not-allowed ${className}`}
      >
        <Film className="h-5 w-5 animate-spin" />
        <span>Loading...</span>
      </button>
    );
  }

  if (!trailer) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setShowPlayer(true)}
        className={`flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 ${className}`}
      >
        <Play className="h-5 w-5" />
        <span>Tonton Trailer</span>
      </button>

      {showPlayer && (
        <VideoPlayer
          videoKey={trailer.key}
          title={`${movieTitle} - ${trailer.name}`}
          onClose={() => setShowPlayer(false)}
        />
      )}
    </>
  );
};

export default TrailerButton;