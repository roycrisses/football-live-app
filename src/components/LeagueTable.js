import React, { useState, useEffect } from 'react';
import { Trophy, RefreshCw, AlertCircle } from 'lucide-react';

function LeagueTable() {
  const [selectedLeague, setSelectedLeague] = useState('Premier League');
  const [standings, setStandings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // RapidAPI ESPN API integration
  const fetchLeagueStandings = async (leagueId) => {
    try {
      setLoading(true);
      setError(null);
      
      const apiKey = process.env.REACT_APP_RAPIDAPI_KEY;
      if (!apiKey) {
        setError('RapidAPI key is not configured. Please set the REACT_APP_RAPIDAPI_KEY environment variable.');
        setLoading(false);
        return;
      }

      const host = 'espn13.p.rapidapi.com';
      const rapidApiEndpoints = {
        'PL': 'https://espn13.p.rapidapi.com/v1/feed?source=soccer&offset=0&limit=20',
        'PD': 'https://espn13.p.rapidapi.com/v1/feed?source=soccer&offset=0&limit=20',
        'BL1': 'https://espn13.p.rapidapi.com/v1/feed?source=soccer&offset=0&limit=20'
      };
      
      const response = await fetch(rapidApiEndpoints[leagueId], {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': host
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const soccerContent = data.filter(item => (
          (item.title && item.title.toLowerCase().includes('standings')) ||
          (item.title && item.title.toLowerCase().includes('table')) ||
          (item.description && item.description.toLowerCase().includes('league'))
        ));
        
        if (soccerContent.length > 0) {
          const tableData = soccerContent.map(item => ({
            position: item.position,
            team: item.team,
            played: item.played,
            won: item.won,
            drawn: item.drawn,
            lost: item.lost,
            goalsFor: item.goalsFor,
            goalsAgainst: item.goalsAgainst,
            goalDifference: item.goalDifference,
            points: item.points,
            form: item.form
          }));
          
          setStandings(prev => ({
            ...prev,
            [leagueId]: tableData
          }));
        } else {
          throw new Error('No standings data available');
        }
      } else {
        throw new Error('No data available');
      }
    } catch (err) {
      console.error('Error fetching standings:', err);
      setError(`Failed to load ${selectedLeague} standings. Please try again later.`);
      setStandings({});
    } finally {
      setLoading(false);
    }
  };

  const leagues = {
    'Premier League': { id: 'PL', name: 'Premier League' },
    'La Liga': { id: 'PD', name: 'La Liga' },
    'Bundesliga': { id: 'BL1', name: 'Bundesliga' }
  };

  useEffect(() => {
    const leagueId = leagues[selectedLeague]?.id;
    if (leagueId) {
      fetchLeagueStandings(leagueId);
    }
  }, [selectedLeague]);

  const getFormColor = (result) => {
    switch (result) {
      case 'W': return 'bg-ds-success';
      case 'D': return 'bg-ds-warning';
      case 'L': return 'bg-ds-error';
      default: return 'bg-ds-text-muted';
    }
  };

  const getPositionClass = (position) => {
    if (position <= 4) return 'bg-ds-success/20 border-ds-success/30';
    if (position <= 6) return 'bg-ds-info/20 border-ds-info/30';
    if (position <= 17) return 'bg-ds-warning/20 border-ds-warning/30';
    return 'bg-ds-error/20 border-ds-error/30';
  };

  const currentStandings = standings[leagues[selectedLeague]?.id] || [];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-4">
          🏆 League Tables
        </h1>
        <p className="ds-secondary">
          Real-time standings from RapidAPI ESPN API
        </p>
        <div className="mt-4">
          <button 
            onClick={() => fetchLeagueStandings(leagues[selectedLeague]?.id)}
            disabled={loading}
            className="ds-btn-primary px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center mx-auto"
          >
            {loading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
            {loading ? 'Loading...' : '🔄 Refresh Data'}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="error-state rounded-lg p-4 mb-6 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* League Selector */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-2 ds-card-elev rounded-lg p-1">
          {Object.keys(leagues).map((league) => (
            <button
              key={league}
              onClick={() => setSelectedLeague(league)}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedLeague === league ? 'ds-chip-active' : 'ds-chip'
              }`}
            >
              {league}
            </button>
          ))}
        </div>
      </div>

      {/* League Table */}
      <div className="ds-card rounded-xl p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Trophy className="w-6 h-6 mr-2" />
          {selectedLeague} Table
          {loading && <RefreshCw className="w-5 h-5 ml-2 animate-spin" />}
        </h2>
        
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-12 h-12 mx-auto mb-4 animate-spin text-ds-accent-blue" />
            <p className="ds-secondary">Loading league standings...</p>
          </div>
        ) : currentStandings.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ds-border">
                <th className="text-left py-3 px-2 ds-secondary font-medium">Pos</th>
                <th className="text-left py-3 px-2 ds-secondary font-medium">Team</th>
                <th className="text-center py-3 px-2 ds-secondary font-medium">P</th>
                <th className="text-center py-3 px-2 ds-secondary font-medium">W</th>
                <th className="text-center py-3 px-2 ds-secondary font-medium">D</th>
                <th className="text-center py-3 px-2 ds-secondary font-medium">L</th>
                <th className="text-center py-3 px-2 ds-secondary font-medium">GF</th>
                <th className="text-center py-3 px-2 ds-secondary font-medium">GA</th>
                <th className="text-center py-3 px-2 ds-secondary font-medium">GD</th>
                <th className="text-center py-3 px-2 ds-secondary font-medium">Pts</th>
                <th className="text-center py-3 px-2 ds-secondary font-medium">Form</th>
              </tr>
            </thead>
            <tbody>
              {currentStandings.map((team) => (
                <tr key={team.team} className="border-b border-ds-border hover:bg-ds-surface-elev">
                  <td className="py-3 px-2">
                    <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full border ${getPositionClass(team.position)}`}>
                      <span className="font-bold text-sm">{team.position}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{team.team}</span>
                      {team.position <= 4 && <Trophy className="w-4 h-4 text-ds-accent-yellow" />}
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center ds-secondary">{team.played}</td>
                  <td className="py-3 px-2 text-center ds-secondary">{team.won}</td>
                  <td className="py-3 px-2 text-center ds-secondary">{team.drawn}</td>
                  <td className="py-3 px-2 text-center ds-secondary">{team.lost}</td>
                  <td className="py-3 px-2 text-center ds-secondary">{team.goalsFor}</td>
                  <td className="py-3 px-2 text-center ds-secondary">{team.goalsAgainst}</td>
                  <td className="py-3 px-2 text-center">
                    <span className={`font-medium ${team.goalDifference > 0 ? 'text-ds-success' : team.goalDifference < 0 ? 'text-ds-error' : 'ds-secondary'}`}>
                      {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className="font-bold">{team.points}</span>
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
        ) : (
          <div className="text-center py-12">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-ds-text-muted" />
            <p className="ds-secondary">No standings available for this league.</p>
          </div>
        )}
      </div>

      {/* Table Legend */}
      <div className="ds-card rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Table Legend</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-ds-success/20 border border-ds-success/30 rounded-full"></div>
              <span className="ds-secondary">Champions League Qualification</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-ds-info/20 border border-ds-info/30 rounded-full"></div>
              <span className="ds-secondary">Europa League Qualification</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-ds-warning/20 border border-ds-warning/30 rounded-full"></div>
              <span className="ds-secondary">Mid-table Safety</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-ds-error/20 border border-ds-error/30 rounded-full"></div>
              <span className="ds-secondary">Relegation Zone</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeagueTable;
