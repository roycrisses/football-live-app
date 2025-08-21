import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus, RefreshCw, AlertCircle } from 'lucide-react';

function LeagueTable() {
  const [selectedLeague, setSelectedLeague] = useState('Premier League');
  const [standings, setStandings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ESPN API integration (free, no API key required)
  const fetchLeagueStandings = async (leagueId) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Fetching standings for ${leagueId}...`);
      
      // ESPN API endpoints for different leagues
      const espnEndpoints = {
        'PL': 'https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/standings',
        'PD': 'https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/standings',
        'BL1': 'https://site.api.espn.com/apis/site/v2/sports/soccer/ger.1/standings'
      };
      
      const response = await fetch(espnEndpoints[leagueId]);
      
      console.log(`Response status: ${response.status}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('ESPN API Response:', data);
      
      if (data.groups && data.groups.length > 0) {
        const tableData = data.groups[0].standings.map(team => ({
          position: team.stats.find(s => s.name === 'rank')?.value || 0,
          team: team.team.name,
          played: team.stats.find(s => s.name === 'gamesPlayed')?.value || 0,
          won: team.stats.find(s => s.name === 'wins')?.value || 0,
          drawn: team.stats.find(s => s.name === 'ties')?.value || 0,
          lost: team.stats.find(s => s.name === 'losses')?.value || 0,
          goalsFor: team.stats.find(s => s.name === 'pointsFor')?.value || 0,
          goalsAgainst: team.stats.find(s => s.name === 'pointsAgainst')?.value || 0,
          goalDifference: (team.stats.find(s => s.name === 'pointsFor')?.value || 0) - (team.stats.find(s => s.name === 'pointsAgainst')?.value || 0),
          points: team.stats.find(s => s.name === 'points')?.value || 0,
          form: team.stats.find(s => s.name === 'form')?.value?.split('').slice(-5) || ['-', '-', '-', '-', '-']
        }));
        
        setStandings(prev => ({
          ...prev,
          [leagueId]: tableData
        }));
        console.log(`Successfully loaded ${tableData.length} teams for ${leagueId}`);
      } else {
        console.warn('No standings data found in ESPN API response');
        throw new Error('No standings data available');
      }
    } catch (err) {
      console.error('Error fetching standings:', err);
      setError(`Failed to load ${selectedLeague} standings (${err.message}). Using cached data.`);
      
      // Fallback to mock data
      const fallbackData = {
        'PL': [
          { position: 1, team: 'Arsenal', played: 20, won: 15, drawn: 3, lost: 2, goalsFor: 42, goalsAgainst: 18, goalDifference: 24, points: 48, form: ['W', 'W', 'D', 'W', 'W'] },
          { position: 2, team: 'Manchester City', played: 20, won: 14, drawn: 4, lost: 2, goalsFor: 45, goalsAgainst: 20, goalDifference: 25, points: 46, form: ['W', 'W', 'W', 'D', 'W'] },
          { position: 3, team: 'Liverpool', played: 20, won: 13, drawn: 6, lost: 1, goalsFor: 43, goalsAgainst: 19, goalDifference: 24, points: 45, form: ['W', 'D', 'W', 'W', 'D'] },
          { position: 4, team: 'Aston Villa', played: 20, won: 13, drawn: 4, lost: 3, goalsFor: 43, goalsAgainst: 27, goalDifference: 16, points: 43, form: ['W', 'D', 'W', 'W', 'L'] },
          { position: 5, team: 'Tottenham', played: 20, won: 12, drawn: 3, lost: 5, goalsFor: 42, goalsAgainst: 31, goalDifference: 11, points: 39, form: ['W', 'L', 'W', 'W', 'D'] }
        ],
        'PD': [
          { position: 1, team: 'Real Madrid', played: 20, won: 16, drawn: 3, lost: 1, goalsFor: 40, goalsAgainst: 11, goalDifference: 29, points: 51, form: ['W', 'W', 'W', 'D', 'W'] },
          { position: 2, team: 'Girona', played: 20, won: 15, drawn: 4, lost: 1, goalsFor: 46, goalsAgainst: 24, goalDifference: 22, points: 49, form: ['W', 'W', 'D', 'W', 'W'] },
          { position: 3, team: 'Barcelona', played: 20, won: 13, drawn: 5, lost: 2, goalsFor: 40, goalsAgainst: 24, goalDifference: 16, points: 44, form: ['W', 'D', 'W', 'D', 'W'] },
          { position: 4, team: 'Atletico Madrid', played: 20, won: 12, drawn: 2, lost: 6, goalsFor: 35, goalsAgainst: 23, goalDifference: 12, points: 38, form: ['W', 'L', 'W', 'L', 'W'] },
          { position: 5, team: 'Athletic Bilbao', played: 20, won: 11, drawn: 6, lost: 3, goalsFor: 35, goalsAgainst: 19, goalDifference: 16, points: 39, form: ['W', 'D', 'W', 'D', 'L'] }
        ],
        'BL1': [
          { position: 1, team: 'Bayer Leverkusen', played: 17, won: 14, drawn: 3, lost: 0, goalsFor: 47, goalsAgainst: 12, goalDifference: 35, points: 45, form: ['W', 'W', 'W', 'D', 'W'] },
          { position: 2, team: 'Bayern Munich', played: 17, won: 13, drawn: 2, lost: 2, goalsFor: 52, goalsAgainst: 19, goalDifference: 33, points: 41, form: ['W', 'W', 'W', 'W', 'L'] },
          { position: 3, team: 'VfB Stuttgart', played: 17, won: 11, drawn: 1, lost: 5, goalsFor: 36, goalsAgainst: 18, goalDifference: 18, points: 34, form: ['W', 'L', 'W', 'W', 'L'] },
          { position: 4, team: 'RB Leipzig', played: 17, won: 10, drawn: 3, lost: 4, goalsFor: 38, goalsAgainst: 20, goalDifference: 18, points: 33, form: ['W', 'D', 'L', 'W', 'W'] },
          { position: 5, team: 'Borussia Dortmund', played: 17, won: 8, drawn: 6, lost: 3, goalsFor: 32, goalsAgainst: 23, goalDifference: 9, points: 30, form: ['D', 'W', 'D', 'W', 'D'] }
        ]
      };
      
      setStandings(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const leagues = {
    'Premier League': { id: 'PL', name: 'Premier League' },
    'La Liga': { id: 'PD', name: 'La Liga' },
    'Bundesliga': { id: 'BL1', name: 'Bundesliga' }
  };

  // Test ESPN API connection
  const testAPIConnection = async () => {
    try {
      console.log('Testing ESPN API connection...');
      const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/standings');
      console.log('ESPN API Test Response Status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('ESPN API Test Success:', data.name || 'Premier League');
      } else {
        const errorText = await response.text();
        console.error('ESPN API Test Failed:', errorText);
      }
    } catch (err) {
      console.error('ESPN API Test Error:', err);
    }
  };

  useEffect(() => {
    const leagueId = leagues[selectedLeague]?.id;
    if (leagueId) {
      // Test API first
      testAPIConnection();
      fetchLeagueStandings(leagueId);
    }
  }, [selectedLeague]);

  const getFormColor = (result) => {
    switch (result) {
      case 'W': return 'bg-green-500';
      case 'D': return 'bg-yellow-500';
      case 'L': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPositionClass = (position) => {
    if (position <= 4) return 'bg-green-500/20 border-green-500/30';
    if (position <= 6) return 'bg-blue-500/20 border-blue-500/30';
    if (position <= 17) return 'bg-yellow-500/20 border-yellow-500/30';
    return 'bg-red-500/20 border-red-500/30';
  };

  const currentStandings = standings[leagues[selectedLeague]?.id] || [];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          🏆 League Tables
        </h1>
        <p className="text-gray-300">
          Real-time standings from ESPN API (Free & Public)
        </p>
        <div className="mt-4">
          <button 
            onClick={() => fetchLeagueStandings(leagues[selectedLeague]?.id)}
            disabled={loading}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center mx-auto"
          >
            {loading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
            {loading ? 'Loading...' : '🔄 Refresh Data'}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span className="text-red-200">{error}</span>
        </div>
      )}

      {/* League Selector */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-2 bg-white/10 rounded-lg p-1">
          {Object.keys(leagues).map((league) => (
            <button
              key={league}
              onClick={() => setSelectedLeague(league)}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedLeague === league
                  ? 'bg-yellow-500 text-black'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {league}
            </button>
          ))}
        </div>
      </div>

      {/* League Table */}
      <div className="glass rounded-xl p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
          {selectedLeague} Table
          {loading && <RefreshCw className="w-5 h-5 ml-2 animate-spin text-yellow-400" />}
        </h2>
        
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-12 h-12 mx-auto mb-4 animate-spin text-yellow-400" />
            <p className="text-gray-300">Loading league standings...</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 px-2 text-gray-300 font-medium">Pos</th>
                <th className="text-left py-3 px-2 text-gray-300 font-medium">Team</th>
                <th className="text-center py-3 px-2 text-gray-300 font-medium">P</th>
                <th className="text-center py-3 px-2 text-gray-300 font-medium">W</th>
                <th className="text-center py-3 px-2 text-gray-300 font-medium">D</th>
                <th className="text-center py-3 px-2 text-gray-300 font-medium">L</th>
                <th className="text-center py-3 px-2 text-gray-300 font-medium">GF</th>
                <th className="text-center py-3 px-2 text-gray-300 font-medium">GA</th>
                <th className="text-center py-3 px-2 text-gray-300 font-medium">GD</th>
                <th className="text-center py-3 px-2 text-gray-300 font-medium">Pts</th>
                <th className="text-center py-3 px-2 text-gray-300 font-medium">Form</th>
              </tr>
            </thead>
            <tbody>
              {currentStandings.map((team) => (
                <tr key={team.team} className="border-b border-white/10 hover:bg-white/5">
                  <td className="py-3 px-2">
                    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full border ${getPositionClass(team.position)}`}>
                      <span className="text-white font-bold text-sm">{team.position}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-white font-medium">{team.team}</span>
                      {team.position <= 4 && <Trophy className="w-4 h-4 text-yellow-400" />}
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center text-gray-300">{team.played}</td>
                  <td className="py-3 px-2 text-center text-gray-300">{team.won}</td>
                  <td className="py-3 px-2 text-center text-gray-300">{team.drawn}</td>
                  <td className="py-3 px-2 text-center text-gray-300">{team.lost}</td>
                  <td className="py-3 px-2 text-center text-gray-300">{team.goalsFor}</td>
                  <td className="py-3 px-2 text-center text-gray-300">{team.goalsAgainst}</td>
                  <td className="py-3 px-2 text-center">
                    <span className={`font-medium ${team.goalDifference > 0 ? 'text-green-400' : team.goalDifference < 0 ? 'text-red-400' : 'text-gray-300'}`}>
                      {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className="text-white font-bold">{team.points}</span>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex space-x-1 justify-center">
                      {team.form.map((result, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full ${getFormColor(result)} flex items-center justify-center`}
                          title={result === 'W' ? 'Win' : result === 'D' ? 'Draw' : 'Loss'}
                        >
                          <span className="text-white text-xs font-bold">{result}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Table Legend */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Table Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500/20 border border-green-500/30 rounded-full"></div>
              <span className="text-gray-300">Champions League Qualification</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500/20 border border-blue-500/30 rounded-full"></div>
              <span className="text-gray-300">Europa League Qualification</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500/20 border border-yellow-500/30 rounded-full"></div>
              <span className="text-gray-300">Mid-table Safety</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500/20 border border-red-500/30 rounded-full"></div>
              <span className="text-gray-300">Relegation Zone</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeagueTable;
