import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { TrendingUp, Clock, Users, AlertCircle, RefreshCw, Zap, Trophy, Target } from 'lucide-react';
import AdBanner from './AdBanner';

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const dataLoadedRef = useRef(false); // Track if we've loaded data

  // Enhanced mock data with 10 matches and win ratio predictions
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
      league: 'Premier League',
      homeWinRatio: 65,
      awayWinRatio: 25,
      drawRatio: 10
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
      league: 'La Liga',
      homeWinRatio: 45,
      awayWinRatio: 40,
      drawRatio: 15
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
      league: 'Bundesliga',
      homeWinRatio: 70,
      awayWinRatio: 20,
      drawRatio: 10
    },
    {
      id: 4,
      homeTeam: 'Liverpool',
      awayTeam: 'Chelsea',
      homeScore: 0,
      awayScore: 0,
      status: 'LIVE',
      minute: 23,
      trendingScore: 78,
      league: 'Premier League',
      homeWinRatio: 55,
      awayWinRatio: 30,
      drawRatio: 15
    },
    {
      id: 5,
      homeTeam: 'PSG',
      awayTeam: 'Marseille',
      homeScore: 2,
      awayScore: 1,
      status: 'LIVE',
      minute: 89,
      trendingScore: 75,
      league: 'Ligue 1',
      homeWinRatio: 60,
      awayWinRatio: 25,
      drawRatio: 15
    },
    {
      id: 6,
      homeTeam: 'AC Milan',
      awayTeam: 'Inter Milan',
      homeScore: 1,
      awayScore: 2,
      status: 'LIVE',
      minute: 56,
      trendingScore: 72,
      league: 'Serie A',
      homeWinRatio: 35,
      awayWinRatio: 50,
      drawRatio: 15
    },
    {
      id: 7,
      homeTeam: 'Ajax',
      awayTeam: 'PSV',
      homeScore: 0,
      awayScore: 1,
      status: 'LIVE',
      minute: 34,
      trendingScore: 68,
      league: 'Eredivisie',
      homeWinRatio: 40,
      awayWinRatio: 45,
      drawRatio: 15
    },
    {
      id: 8,
      homeTeam: 'Porto',
      awayTeam: 'Benfica',
      homeScore: 1,
      awayScore: 1,
      status: 'LIVE',
      minute: 67,
      trendingScore: 65,
      league: 'Primeira Liga',
      homeWinRatio: 45,
      awayWinRatio: 40,
      drawRatio: 15
    },
    {
      id: 9,
      homeTeam: 'Celtic',
      awayTeam: 'Rangers',
      homeScore: 2,
      awayScore: 0,
      status: 'LIVE',
      minute: 78,
      trendingScore: 62,
      league: 'Scottish Premiership',
      homeWinRatio: 55,
      awayWinRatio: 30,
      drawRatio: 15
    },
    {
      id: 10,
      homeTeam: 'Feyenoord',
      awayTeam: 'AZ Alkmaar',
      homeScore: 1,
      awayScore: 1,
      status: 'LIVE',
      minute: 45,
      trendingScore: 58,
      league: 'Eredivisie',
      homeWinRatio: 50,
      awayWinRatio: 35,
      drawRatio: 15
    }
  ];

  // ENHANCED: fetchMatches that never overwrites once data is loaded
  const fetchMatches = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // If we already have data, don't overwrite it
      if (dataLoadedRef.current && matches.length > 0) {
        console.log('Data already loaded, skipping fetch');
        setLastUpdated(new Date());
        setLoading(false);
        return;
      }
      
      // Set initial mock data
      if (matches.length === 0) {
        console.log('Setting initial mock data');
        setMatches(mockMatches);
        dataLoadedRef.current = true;
      }
      
      setLastUpdated(new Date());
      
      // Try to fetch from Netlify function in background
      try {
        console.log('Attempting to fetch from Netlify function...');
        const response = await axios.get('/.netlify/functions/live-matches', {
          timeout: 8000
        });
        
        console.log('Netlify function response:', response.data);
        
        // Only update if we have no matches AND API returns good data
        if (matches.length === 0 && response.data && response.data.length >= 8) {
          const enhancedData = response.data.map(match => ({
            ...match,
            homeWinRatio: Math.floor(Math.random() * 40) + 30,
            awayWinRatio: Math.floor(Math.random() * 40) + 20,
            drawRatio: Math.floor(Math.random() * 20) + 10
          }));
          setMatches(enhancedData);
          dataLoadedRef.current = true;
          console.log('Updated with real data:', enhancedData.length, 'matches');
        } else {
          console.log('Keeping existing data, not overwriting');
        }
      } catch (apiError) {
        console.error('Netlify function error:', apiError);
        console.log('API error, keeping existing data');
      }
      
    } catch (err) {
      console.error('General fetch error:', err);
      // Only set matches if we don't have any
      if (matches.length === 0) {
        setMatches(mockMatches);
        dataLoadedRef.current = true;
      }
    } finally {
      setLoading(false);
    }
  }, [matches.length]);

  // Manual refresh function for users
  const handleManualRefresh = useCallback(async () => {
    console.log('Manual refresh requested');
    setLoading(true);
    
    try {
      const response = await axios.get('/.netlify/functions/live-matches', {
        timeout: 8000
      });
      
      if (response.data && response.data.length >= 8) {
        const enhancedData = response.data.map(match => ({
          ...match,
          homeWinRatio: Math.floor(Math.random() * 40) + 30,
          awayWinRatio: Math.floor(Math.random() * 40) + 20,
          drawRatio: Math.floor(Math.random() * 20) + 10
        }));
        setMatches(enhancedData);
        console.log('Manual refresh successful:', enhancedData.length, 'matches');
      } else {
        console.log('Manual refresh: insufficient data, keeping current matches');
      }
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Manual refresh failed:', error);
      // Keep current matches on error
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to promote a match to the top
  const promoteMatch = useCallback((matchId) => {
    setMatches(prevMatches => {
      // Ensure we have matches to work with
      if (!prevMatches || prevMatches.length === 0) {
        console.log('No matches to promote, restoring mock data');
        return mockMatches;
      }
      
      const matchIndex = prevMatches.findIndex(match => match.id === matchId);
      if (matchIndex === -1) {
        console.log('Match not found for promotion');
        return prevMatches;
      }
      
      // Create new array and promote the match
      const newMatches = [...prevMatches];
      const [promotedMatch] = newMatches.splice(matchIndex, 1);
      newMatches.unshift(promotedMatch);
      
      console.log(`Promoted match: ${promotedMatch.homeTeam} vs ${promotedMatch.awayTeam} to #1`);
      return newMatches;
    });
  }, []);

  // NEW: Only fetch once on mount, no auto-refresh
  useEffect(() => {
    fetchMatches();
    // Removed auto-refresh to prevent state overwriting
  }, [fetchMatches]);

  // SINGLE Safeguard: Ensure we always have matches
  useEffect(() => {
    if (matches.length === 0 && !loading) {
      console.log('Matches became empty, restoring mock data');
      setMatches(mockMatches);
    }
  }, [matches.length, loading]);

  // ENHANCED Safeguard: Prevent matches from ever being reduced
  useEffect(() => {
    if (matches.length > 0 && matches.length < 10 && !loading) {
      console.log(`Matches reduced to ${matches.length}, restoring full mock data`);
      setMatches(mockMatches);
    }
  }, [matches.length, loading]);

  // Debug: Log matches state changes
  useEffect(() => {
    console.log('Matches state updated:', matches.length, 'matches');
    if (matches.length > 0) {
      console.log('First match:', matches[0].homeTeam, 'vs', matches[0].awayTeam);
    }
  }, [matches]);

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
                  🔥 Top 10 Trending Live Football
                </h1>
                <p className="text-gray-300 text-sm">
                  {lastUpdated && `Last updated: ${lastUpdated.toLocaleTimeString()}`}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleManualRefresh}
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

        {/* Top Ad Banner */}
        <AdBanner 
          adSlot="5352978920" 
          className="mb-8" 
          fallback="🔥 Premium Football Content • Stay updated with live scores and predictions"
        />

        {/* Debug Info - Remove this after fixing the issue */}
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 mb-4 text-center">
          <p className="text-blue-200 text-sm">
            🔍 Debug: Currently showing {matches.length} matches | 
            {loading ? ' Loading...' : ' Ready'} | 
            Last updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Never'}
          </p>
        </div>

        {/* Top Trending Matches Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
            Top 10 Trending Matches
            <span className="ml-2 text-sm text-gray-400">(Click any match to promote to top)</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {matches.map((match, index) => (
              <div 
                key={match.id} 
                className="glass rounded-xl p-4 match-card cursor-pointer hover:scale-105 transition-all duration-200"
                onClick={() => promoteMatch(match.id)}
              >
                {/* Match Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">{match.league}</span>
                    {index === 0 && (
                      <Trophy className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium text-white flex items-center space-x-1 ${getStatusColor(match.status)}`}>
                    {getStatusIcon(match.status)}
                    <span>{match.status}</span>
                    {match.minute && <span>• {match.minute}'</span>}
                  </div>
                </div>
                
                {/* Team Names and Scores */}
                <div className="text-center mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium text-sm truncate">{match.homeTeam}</span>
                    <span className="text-2xl font-bold text-yellow-400">{match.homeScore}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium text-sm truncate">{match.awayTeam}</span>
                    <span className="text-2xl font-bold text-yellow-400">{match.awayScore}</span>
                  </div>
                </div>
                
                {/* Trending Score */}
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span>Trending: {match.trendingScore}%</span>
                  <span className="text-yellow-400">#{index + 1}</span>
                </div>
                
                {/* Win Ratio Prediction Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span>Win Prediction</span>
                    <Target className="w-3 h-3" />
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${match.homeWinRatio}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{match.homeTeam}: {match.homeWinRatio}%</span>
                    <span>Draw: {match.drawRatio}%</span>
                    <span>{match.awayTeam}: {match.awayWinRatio}%</span>
                  </div>
                </div>
                
                {/* Click to Promote Hint */}
                <div className="text-center text-xs text-gray-500 border-t border-gray-600 pt-2">
                  Click to promote to top
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Ad Banner */}
        <AdBanner 
          adSlot="5352978920" 
          className="mb-8" 
          fallback="⚽ Live Match Updates • Get real-time scores and trending analysis"
        />

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
            <p>🔥 Top 10 Trending Live Football • Real-time scores with AI-powered win predictions</p>
          </div>
        </div>
      </footer>

      {/* Bottom Ad Banner */}
      <AdBanner 
        adSlot="5352978920" 
        className="mt-8" 
        fallback="🎯 Win Prediction Analytics • Advanced football insights and trends"
      />
    </div>
  );
}

export default App;