import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WatchlistProvider } from './context/WatchlistContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import DiscoverPage from './pages/DiscoverPage';
import MovieDetailPage from './pages/MovieDetailPage';
import WatchlistPage from './pages/WatchlistPage';

function App() {
  return (
    <WatchlistProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
          </Routes>
        </div>
      </Router>
    </WatchlistProvider>
  );
}

export default App;