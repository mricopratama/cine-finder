import React from 'react';
import { Film } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <Film className="h-12 w-12 text-blue-500 animate-spin" />
        <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-400 text-lg">Memuat film...</p>
    </div>
  );
};

export default LoadingSpinner;