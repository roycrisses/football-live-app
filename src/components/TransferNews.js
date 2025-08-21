import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Clock, CheckCircle, AlertCircle } from 'lucide-react';

function TransferNews() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const transfers = [
    {
      id: 1,
      player: 'Jude Bellingham',
      from: 'Borussia Dortmund',
      to: 'Real Madrid',
      fee: '€103m',
      status: 'Completed',
      date: '2024-01-15',
      category: 'Completed',
      description: 'England midfielder completes record-breaking move to Spanish giants',
      impact: 'High',
      league: 'La Liga'
    },
    {
      id: 2,
      player: 'Harry Kane',
      from: 'Tottenham',
      to: 'Bayern Munich',
      fee: '€100m',
      status: 'Completed',
      date: '2024-01-14',
      category: 'Completed',
      description: 'Premier League legend moves to Bundesliga champions',
      impact: 'High',
      league: 'Bundesliga'
    },
    {
      id: 3,
      player: 'Declan Rice',
      from: 'West Ham',
      to: 'Arsenal',
      fee: '€116m',
      status: 'Completed',
      date: '2024-01-13',
      category: 'Completed',
      description: 'England international strengthens Arsenal midfield',
      impact: 'High',
      league: 'Premier League'
    },
    {
      id: 4,
      player: 'Moises Caicedo',
      from: 'Brighton',
      to: 'Chelsea',
      fee: '€116m',
      status: 'Completed',
      date: '2024-01-12',
      category: 'Completed',
      description: 'Ecuadorian midfielder joins Chelsea revolution',
      impact: 'High',
      league: 'Premier League'
    },
    {
      id: 5,
      player: 'Victor Osimhen',
      from: 'Napoli',
      to: 'Chelsea',
      fee: '€120m',
      status: 'Rumored',
      date: '2024-01-15',
      category: 'Rumored',
      description: 'Nigerian striker linked with Stamford Bridge move',
      impact: 'High',
      league: 'Premier League'
    },
    {
      id: 6,
      player: 'Kylian Mbappé',
      from: 'PSG',
      to: 'Real Madrid',
      fee: 'Free',
      status: 'Rumored',
      date: '2024-01-15',
      category: 'Rumored',
      description: 'French superstar expected to join Los Blancos',
      impact: 'Very High',
      league: 'La Liga'
    },
    {
      id: 7,
      player: 'Erling Haaland',
      from: 'Manchester City',
      to: 'Real Madrid',
      fee: '€200m',
      status: 'Rumored',
      date: '2024-01-14',
      category: 'Rumored',
      description: 'Norwegian striker linked with Madrid move',
      impact: 'Very High',
      league: 'La Liga'
    },
    {
      id: 8,
      player: 'Frenkie de Jong',
      from: 'Barcelona',
      to: 'Manchester United',
      fee: '€80m',
      status: 'Rumored',
      date: '2024-01-13',
      category: 'Rumored',
      description: 'Dutch midfielder could reunite with Ten Hag',
      impact: 'Medium',
      league: 'Premier League'
    },
    {
      id: 9,
      player: 'Rafael Leão',
      from: 'AC Milan',
      to: 'Chelsea',
      fee: '€100m',
      status: 'Rumored',
      date: '2024-01-12',
      category: 'Rumored',
      description: 'Portuguese winger linked with Chelsea move',
      impact: 'Medium',
      league: 'Premier League'
    },
    {
      id: 10,
      player: 'Aurélien Tchouaméni',
      from: 'Real Madrid',
      to: 'Liverpool',
      fee: '€70m',
      status: 'Rumored',
      date: '2024-01-11',
      category: 'Rumored',
      description: 'French midfielder could join Liverpool midfield',
      impact: 'Medium',
      league: 'Premier League'
    }
  ];

  const categories = ['All', 'Completed', 'Rumored', 'Confirmed'];
  const leagues = ['All', 'Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1'];

  const [selectedLeague, setSelectedLeague] = useState('All');

  const filteredTransfers = transfers.filter(transfer => {
    const categoryMatch = selectedCategory === 'All' || transfer.category === selectedCategory;
    const leagueMatch = selectedLeague === 'All' || transfer.league === selectedLeague;
    return categoryMatch && leagueMatch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'Confirmed':
        return <CheckCircle className="w-4 h-4 text-blue-400" />;
      case 'Rumored':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Confirmed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Rumored':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'Very High':
        return 'text-red-400';
      case 'High':
        return 'text-orange-400';
      case 'Medium':
        return 'text-yellow-400';
      case 'Low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          🔄 Transfer News & Rumors
        </h1>
        <p className="text-gray-300">
          Latest transfer updates, confirmed deals, and transfer rumors
        </p>
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-6">
        <div className="flex flex-wrap gap-4 justify-center">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <div className="flex space-x-2 bg-white/10 rounded-lg p-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-yellow-500 text-black'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* League Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">League</label>
            <div className="flex space-x-2 bg-white/10 rounded-lg p-1">
              {leagues.map((league) => (
                <button
                  key={league}
                  onClick={() => setSelectedLeague(league)}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
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
        </div>
      </div>

      {/* Transfer List */}
      <div className="space-y-4">
        {filteredTransfers.map((transfer) => (
          <div key={transfer.id} className="glass rounded-xl p-6 hover:scale-105 transition-transform">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Transfer Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(transfer.status)}`}>
                    {getStatusIcon(transfer.status)}
                    <span className="ml-1">{transfer.status}</span>
                  </span>
                  <span className="text-gray-400 text-sm">{transfer.date}</span>
                  <span className="text-gray-400 text-sm">•</span>
                  <span className="text-gray-400 text-sm">{transfer.league}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{transfer.player}</h3>
                <p className="text-gray-300 mb-3">{transfer.description}</p>
                
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-400">
                    From: <span className="text-white">{transfer.from}</span>
                  </span>
                  <span className="text-gray-400">→</span>
                  <span className="text-gray-400">
                    To: <span className="text-white">{transfer.to}</span>
                  </span>
                </div>
              </div>

              {/* Transfer Details */}
              <div className="lg:text-right">
                <div className="text-2xl font-bold text-yellow-400 mb-2">{transfer.fee}</div>
                <div className={`text-sm font-medium ${getImpactColor(transfer.impact)}`}>
                  Impact: {transfer.impact}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transfer Statistics */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Transfer Window Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {transfers.filter(t => t.status === 'Completed').length}
            </div>
            <div className="text-gray-300">Completed Transfers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {transfers.filter(t => t.status === 'Rumored').length}
            </div>
            <div className="text-gray-300">Active Rumors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              €{transfers.filter(t => t.status === 'Completed').reduce((sum, t) => {
                const fee = t.fee === 'Free' ? 0 : parseInt(t.fee.replace('€', '').replace('m', ''));
                return sum + fee;
              }, 0)}m
            </div>
            <div className="text-gray-300">Total Spent</div>
          </div>
        </div>
      </div>

      {/* Transfer Tips */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">💡 Transfer Window Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
          <div>
            <h4 className="font-semibold text-white mb-2">For Clubs:</h4>
            <ul className="space-y-1">
              <li>• Plan transfers early in the window</li>
              <li>• Consider both short-term and long-term needs</li>
              <li>• Balance spending with Financial Fair Play</li>
              <li>• Have backup targets for key positions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">For Fans:</h4>
            <ul className="space-y-1">
              <li>• Follow reliable transfer sources</li>
              <li>• Don't believe every rumor</li>
              <li>• Understand transfer window deadlines</li>
              <li>• Consider the impact on team chemistry</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferNews;
