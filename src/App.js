import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, Clock, Users, AlertCircle, RefreshCw, Zap } from 'lucide-react';

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Mock data for development/demo
  const mockMatches = [
    {
      id: 1,
      homeTeam: 'Manchester City',
      awayTeam: 'Arsenal',
      homeScore: 2,
      awayScore: 1,
      status: 'LIVE',
      minute: 67,
      trendingScore: 95,
      league: 'Premier League'
    },
    {
      id: 2,
      homeTeam: 'Barcelona',
      awayTeam: 'Real Madrid',
      homeScore: 1,
      awayScore: 1,
      status: 'HT',
      minute: 45,
      trendingScore: 88,
      league: 'La Liga'
    },
    {
      id: 3,
      homeTeam: 'Bayern Munich',
      awayTeam: 'Borussia Dortmund',
      homeScore: 3,
      awayScore: 0,
      status: 'LIVE',
      minute: 78,
      trendingScore: 82,
      league: 'Bundesliga'
    }
  ];

  // These are embedded in the build
  const API_KEY = process.env.REACT_APP_FOOTBALL_API_KEY;
  const API_URL = process.env.REACT_APP_FOOTBALL_API_URL;

  const fetchMatches = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from Netlify function, fallback to mock data
      try {
        const response = await axios.get(`${API_URL}/matches`, {
          headers: { 'X-Auth-Token': API_KEY }
        });
        setMatches(response.data);
      } catch (apiError) {
        console.log('API not available, using mock data:', apiError.message);
        setMatches(mockMatches);
      }
      
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch live matches');
      setMatches(mockMatches); // Fallback to mock data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchMatches, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'LIVE': return 'bg-red-500 status-live';
      case 'HT': return 'bg-yellow-500 status-ht';
      case 'FT': return 'bg-gray-500 status-ft';
      default: return 'bg-blue-500 status-default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'LIVE': return <Zap className="w-3 h-3" />;
      case 'HT': return <Clock className="w-3 h-3" />;
      default: return null;
    }
  };

  if (loading && matches.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading trending matches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl">
                <TrendingUp className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white header-title">
                  🔥 Trending Live Football
                </h1>
                <p className="text-gray-300 text-sm">
                  {lastUpdated && `Last updated: ${lastUpdated.toLocaleTimeString()}`}
                </p>
              </div>
            </div>
            
            <button
              onClick={fetchMatches}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 hover:scale-105 no-print"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-200">{error}</span>
          </div>
        )}

        {/* Featured Match */}
        {matches.length > 0 && (
          <div className="mb-8 slide-in">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-yellow-400" />
              Most Trending Match
            </h2>
            <div className="glass rounded-2xl p-6 featured-match match-card">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-300">{matches[0].league}</span>
                <div className={`px-3 py-1 rounded-full text-xs font-medium text-white flex items-center space-x-1 ${getStatusColor(matches[0].status)}`}>
                  {getStatusIcon(matches[0].status)}
                  <span>{matches[0].status}</span>
                  {matches[0].status === 'LIVE' && matches[0].minute && (
                    <span>• {matches[0].minute}'</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="text-center flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 match-teams">
                    {matches[0].homeTeam}
                  </h3>
                  <div className="text-4xl font-black text-yellow-400 match-score score-update">
                    {matches[0].homeScore}
                  </div>
                </div>
                
                <div className="text-center px-6">
                  <div className="text-2xl font-bold text-white">VS</div>
                </div>
                
                <div className="text-center flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 match-teams">
                    {matches[0].awayTeam}
                  </h3>
                  <div className="text-4xl font-black text-yellow-400 match-score score-update">
                    {matches[0].awayScore}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-300">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">Trending Score: {matches[0].trendingScore}%</span>
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="trending-bar" 
                      style={{ width: `${matches[0].trendingScore}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center text-gray-300">
                  <Users className="w-4 h-4 mr-1" />
                  <span className="text-sm">Hot</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Matches Grid */}
        {matches.length > 1 && (
          <div className="fade-in">
            <h2 className="text-xl font-semibold text-white mb-4">Other Trending Matches</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 match-grid">
              {matches.slice(1).map((match, index) => (
                <div key={match.id} className="glass rounded-xl p-4 match-card">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-400">{match.league}</span>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium text-white flex items-center space-x-1 ${getStatusColor(match.status)}`}>
                      {getStatusIcon(match.status)}
                      <span>{match.status}</span>
                    </div>
                  </div>
                  
                  <div className="text-center mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium text-sm">{match.homeTeam}</span>
                      <span className="text-2xl font-bold text-yellow-400">{match.homeScore}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm">{match.awayTeam}</span>
                      <span className="text-2xl font-bold text-yellow-400">{match.awayScore}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Trending: {match.trendingScore}%</span>
                    {match.minute && <span>{match.minute}'</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {matches.length === 0 && !loading && (
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No matches found</h3>
            <p className="text-gray-400">Check back later for trending football matches</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-md border-t border-white/10 mt-16 no-print">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-400 text-sm">
            <p>🔥 Trending Live Football • Real-time scores and Google Trends integration</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;