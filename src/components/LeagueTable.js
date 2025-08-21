import React, { useState } from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';

function LeagueTable() {
  const [selectedLeague, setSelectedLeague] = useState('Premier League');
  
  const leagues = {
    'Premier League': [
      { position: 1, team: 'Arsenal', played: 20, won: 15, drawn: 3, lost: 2, goalsFor: 42, goalsAgainst: 18, goalDifference: 24, points: 48, form: ['W', 'W', 'D', 'W', 'W'] },
      { position: 2, team: 'Manchester City', played: 20, won: 14, drawn: 3, lost: 3, goalsFor: 45, goalsAgainst: 21, goalDifference: 24, points: 45, form: ['W', 'W', 'W', 'D', 'W'] },
      { position: 3, team: 'Aston Villa', played: 20, won: 13, drawn: 4, lost: 3, goalsFor: 43, goalsAgainst: 27, goalDifference: 16, points: 43, form: ['W', 'D', 'W', 'W', 'L'] },
      { position: 4, team: 'Liverpool', played: 20, won: 12, drawn: 6, lost: 2, goalsFor: 39, goalsAgainst: 19, goalDifference: 20, points: 42, form: ['W', 'D', 'W', 'D', 'W'] },
      { position: 5, team: 'Tottenham', played: 20, won: 12, drawn: 3, lost: 5, goalsFor: 42, goalsAgainst: 31, goalDifference: 11, points: 39, form: ['W', 'L', 'W', 'W', 'D'] },
      { position: 6, team: 'West Ham', played: 20, won: 10, drawn: 4, lost: 6, goalsFor: 33, goalsAgainst: 30, goalDifference: 3, points: 34, form: ['L', 'W', 'D', 'W', 'L'] },
      { position: 7, team: 'Brighton', played: 19, won: 8, drawn: 7, lost: 4, goalsFor: 38, goalsAgainst: 32, goalDifference: 6, points: 31, form: ['D', 'W', 'L', 'W', 'D'] },
      { position: 8, team: 'Manchester United', played: 20, won: 10, drawn: 1, lost: 9, goalsFor: 24, goalsAgainst: 29, goalDifference: -5, points: 31, form: ['L', 'W', 'L', 'L', 'W'] },
      { position: 9, team: 'Newcastle', played: 20, won: 9, drawn: 2, lost: 9, goalsFor: 37, goalsAgainst: 29, goalDifference: 8, points: 29, form: ['W', 'L', 'L', 'W', 'L'] },
      { position: 10, team: 'Wolves', played: 20, won: 8, drawn: 4, lost: 8, goalsFor: 30, goalsAgainst: 31, goalDifference: -1, points: 28, form: ['L', 'W', 'D', 'L', 'W'] }
    ],
    'La Liga': [
      { position: 1, team: 'Real Madrid', played: 20, won: 16, drawn: 3, lost: 1, goalsFor: 40, goalsAgainst: 11, goalDifference: 29, points: 51, form: ['W', 'W', 'W', 'D', 'W'] },
      { position: 2, team: 'Girona', played: 20, won: 15, drawn: 2, lost: 3, goalsFor: 46, goalsAgainst: 24, goalDifference: 22, points: 47, form: ['W', 'W', 'W', 'W', 'L'] },
      { position: 3, team: 'Barcelona', played: 20, won: 13, drawn: 5, lost: 2, goalsFor: 40, goalsAgainst: 24, goalDifference: 16, points: 44, form: ['W', 'D', 'W', 'W', 'D'] },
      { position: 4, team: 'Atletico Madrid', played: 20, won: 13, drawn: 2, lost: 5, goalsFor: 36, goalsAgainst: 23, goalDifference: 13, points: 41, form: ['W', 'L', 'W', 'W', 'W'] },
      { position: 5, team: 'Athletic Bilbao', played: 20, won: 12, drawn: 5, lost: 3, goalsFor: 38, goalsAgainst: 21, goalDifference: 17, points: 41, form: ['W', 'D', 'W', 'D', 'W'] }
    ],
    'Bundesliga': [
      { position: 1, team: 'Bayer Leverkusen', played: 17, won: 14, drawn: 3, lost: 0, goalsFor: 47, goalsAgainst: 12, goalDifference: 35, points: 45, form: ['W', 'W', 'W', 'D', 'W'] },
      { position: 2, team: 'Bayern Munich', played: 17, won: 13, drawn: 2, lost: 2, goalsFor: 52, goalsAgainst: 19, goalDifference: 33, points: 41, form: ['W', 'W', 'W', 'W', 'L'] },
      { position: 3, team: 'VfB Stuttgart', played: 17, won: 11, drawn: 1, lost: 5, goalsFor: 36, goalsAgainst: 20, goalDifference: 16, points: 34, form: ['W', 'L', 'W', 'W', 'W'] },
      { position: 4, team: 'RB Leipzig', played: 17, won: 10, drawn: 3, lost: 4, goalsFor: 38, goalsAgainst: 20, goalDifference: 18, points: 33, form: ['W', 'D', 'L', 'W', 'W'] },
      { position: 5, team: 'Borussia Dortmund', played: 17, won: 8, drawn: 6, lost: 3, goalsFor: 32, goalsAgainst: 23, goalDifference: 9, points: 30, form: ['D', 'W', 'D', 'L', 'W'] }
    ]
  };

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

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          🏆 League Tables
        </h1>
        <p className="text-gray-300">
          Current standings and form for top European leagues
        </p>
      </div>

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
        </h2>
        
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
            {leagues[selectedLeague].map((team) => (
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
