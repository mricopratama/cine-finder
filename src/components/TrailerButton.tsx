import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { tmdbService } from '../api/tmdb';
import { Video } from '../types/movie';
import VideoPlayer from './VideoPlayer';

interface TrailerButtonProps {
  movieId: number;
  movieTitle: string;
  className?: string;
}

const TrailerButton: React.FC<TrailerButtonProps> = ({ movieId, movieTitle, className = '' }) => {
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const fetchAndSetVideo = async () => {
      if (!movieId) return;
      setLoading(true);
      try {
        const videos = await tmdbService.getMovieVideos(movieId);
        
        const officialTrailer = videos.find(v => v.type === 'Trailer');
        const teaser = videos.find(v => v.type === 'Teaser');
        
        setVideo(officialTrailer || teaser || videos[0] || null);
      } catch (error) {
        console.error('Gagal mengambil video trailer:', error);
        setVideo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetVideo();
  }, [movieId]);

  if (loading || !video) {
    return null; // Jangan tampilkan apa-apa jika sedang memuat atau tidak ada video
  }

  return (
    <>
      <button
        onClick={() => setShowPlayer(true)}
        className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 bg-red-600 hover:bg-red-700 text-white ${className}`}
      >
        <Play className="h-5 w-5" />
        <span>{video.type === 'Trailer' ? 'Tonton Trailer' : 'Tonton Video'}</span>
      </button>

      {showPlayer && (
        <VideoPlayer
          videoKey={video.key}
          title={`${movieTitle} - ${video.name}`}
          onClose={() => setShowPlayer(false)}
        />
      )}
    </>
  );
};

export default TrailerButton;