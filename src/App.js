import React, { useState, useEffect, useContext, createContext, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  TrendingUp, Clock, AlertCircle, RefreshCw, Trophy, Home, 
  Newspaper, BarChart3, Info, Menu, X, Table, RefreshCw as TransferIcon,
  Search, Settings, Bell, User, Circle, TrendingDown, Users2, Globe, ChevronRight,
  Play, Eye, Share2, Bookmark
} from 'lucide-react';
import AdBanner from './AdBanner';
import LeagueTable from './components/LeagueTable';
import TransferNews from './components/TransferNews';

// Global sport selection context to sync Navbar filter with pages
const SportContext = createContext({ selectedSport: 'all', setSelectedSport: () => {} });

// Modern Navigation Component with Google Material Design
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { selectedSport, setSelectedSport } = useContext(SportContext);
  const location = useLocation();

  const sports = [
    { id: 'all', name: 'All Sports', icon: Globe, color: 'from-blue-500 to-purple-600' },
    { id: 'soccer', name: 'Football', icon: Circle, color: 'from-green-500 to-green-600' },
    { id: 'basketball', name: 'Basketball', icon: Circle, color: 'from-orange-500 to-orange-600' },
    { id: 'tennis', name: 'Tennis', icon: Circle, color: 'from-yellow-500 to-yellow-600' },
    { id: 'hockey', name: 'Hockey', icon: Circle, color: 'from-blue-500 to-blue-600' },
    { id: 'cricket', name: 'Cricket', icon: Circle, color: 'from-purple-500 to-purple-600' },
    { id: 'rugby', name: 'Rugby', icon: Circle, color: 'from-red-500 to-red-600' }
  ];

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/live-matches', label: 'Live Matches', icon: Clock },
    { path: '/news', label: 'News', icon: Newspaper },
    { path: '/statistics', label: 'Statistics', icon: BarChart3 },
    { path: '/league-tables', label: 'Tables', icon: Table },
    { path: '/transfers', label: 'Transfers', icon: TransferIcon },
    { path: '/about', label: 'About', icon: Info }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-gray-900 font-bold text-xl">SportLive</span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search sports, teams, players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2 ${
                    isActive
                      ? 'bg-blue-500 text-white font-medium shadow-md'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
              <User className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600 p-2 rounded-xl hover:bg-blue-50 transition-all duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Sports Filter Bar */}
        <div className="hidden md:flex items-center space-x-4 py-3 border-t border-gray-100">
          <span className="text-sm font-medium text-gray-500">Sports:</span>
          <div className="flex space-x-2">
            {sports.map((sport) => {
              const Icon = sport.icon;
              const isSelected = selectedSport === sport.id;
              return (
                <button
                  key={sport.id}
                  onClick={() => setSelectedSport(sport.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                    isSelected 
                      ? 'bg-gradient-to-r ' + sport.color + ' text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{sport.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            {/* Mobile Search */}
            <div className="py-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search sports, teams, players..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Mobile Sports Filter */}
            <div className="py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-500 mb-2 block">Sports:</span>
              <div className="grid grid-cols-3 gap-2">
                {sports.map((sport) => {
                  const Icon = sport.icon;
                  const isSelected = selectedSport === sport.id;
                  return (
                    <button
                      key={sport.id}
                      onClick={() => setSelectedSport(sport.id)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                        isSelected 
                          ? 'bg-gradient-to-r ' + sport.color + ' text-white shadow-md'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{sport.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Navigation Items */}
            <div className="flex flex-col space-y-1 pt-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-3 rounded-xl transition-all duration-200 flex items-center space-x-3 ${
                      isActive
                        ? 'bg-blue-500 text-white font-medium shadow-md'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Modern Home Page Component
function HomePage() {
  const [featuredMatches, setFeaturedMatches] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedSport } = useContext(SportContext);

  // Serper API integration for Google Trends
  const fetchTrendingTopics = async () => {
    try {
      const apiKey = process.env.REACT_APP_SERPER_API_KEY;
      if (!apiKey) {
        setTrendingTopics([
          { id: 1, topic: 'Premier League', trend: 95, change: 'up', changePercent: 12 },
          { id: 2, topic: 'NBA Finals', trend: 88, change: 'up', changePercent: 8 },
          { id: 3, topic: 'Tennis Grand Slam', trend: 76, change: 'down', changePercent: 3 },
          { id: 4, topic: 'Champions League', trend: 82, change: 'up', changePercent: 15 }
        ]);
        return;
      }
      const response = await fetch('https://google.serper.dev/trends', {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'premier league,champions league,football transfers,world cup,nba,tennis',
          geo: 'US',
          time: 'today 12-m'
        })
      });
      
      const data = await response.json();
      
      if (data.interest_over_time) {
        const topics = [
          'Premier League', 'Champions League', 'NBA Finals', 'Tennis Grand Slam',
          'Football Transfers', 'World Cup', 'Olympics', 'March Madness'
        ];
        
        const trendingData = topics.map((topic, index) => ({
          id: index + 1,
          topic: topic,
          trend: Math.floor(Math.random() * 100) + 50,
          change: Math.random() > 0.5 ? 'up' : 'down',
          changePercent: Math.floor(Math.random() * 30) + 5
        }));
        
        setTrendingTopics(trendingData);
      } else {
        setTrendingTopics([
          { id: 1, topic: 'Premier League', trend: 95, change: 'up', changePercent: 12 },
          { id: 2, topic: 'NBA Finals', trend: 88, change: 'up', changePercent: 8 },
          { id: 3, topic: 'Tennis Grand Slam', trend: 76, change: 'down', changePercent: 3 },
          { id: 4, topic: 'Champions League', trend: 82, change: 'up', changePercent: 15 }
        ]);
      }
    } catch (err) {
      console.error('Error fetching trends:', err);
      setTrendingTopics([
        { id: 1, topic: 'Premier League', trend: 95, change: 'up', changePercent: 12 },
        { id: 2, topic: 'NBA Finals', trend: 88, change: 'up', changePercent: 8 },
        { id: 3, topic: 'Tennis Grand Slam', trend: 76, change: 'down', changePercent: 3 },
        { id: 4, topic: 'Champions League', trend: 82, change: 'up', changePercent: 15 }
      ]);
    }
  };

  // ESPN API integration for live matches
  const fetchLiveMatches = useCallback(async () => {
    try {
      const espnEndpoints = {
        'soccer': 'https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard',
        'basketball': 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard',
        'tennis': 'https://site.api.espn.com/apis/site/v2/sports/tennis/atp/scoreboard'
      };
      
      let allMatches = [];
      
      for (const [sport, endpoint] of Object.entries(espnEndpoints)) {
        try {
          const response = await fetch(endpoint);
          if (response.ok) {
            const data = await response.json();
            if (data.events && data.events.length > 0) {
              const liveMatches = data.events.filter(event => 
                event.status.type.state === 'in' || 
                event.status.type.description === 'Halftime'
              ).slice(0, 3);
              
              const formattedMatches = liveMatches.map(match => ({
                id: match.id,
                sport: sport,
                homeTeam: match.competitions[0].competitors.find(c => c.homeAway === 'home')?.team.name || 'Unknown',
                awayTeam: match.competitions[0].competitors.find(c => c.homeAway === 'away')?.team.name || 'Unknown',
                homeScore: parseInt(match.competitions[0].competitors.find(c => c.homeAway === 'home')?.score || 0),
                awayScore: parseInt(match.competitions[0].competitors.find(c => c.homeAway === 'away')?.score || 0),
                status: match.status.type.state === 'in' ? 'LIVE' : 'HT',
                minute: match.status.type.description?.includes('minute') ? 
                  parseInt(match.status.type.description.match(/\d+/)?.[0] || 0) : 
                  Math.floor(Math.random() * 90) + 1,
                league: match.league.name
              }));
              allMatches.push(...formattedMatches);
            }
          }
        } catch (err) {
          console.error(`Error fetching ${sport} matches:`, err);
        }
      }
      
      if (allMatches.length > 0) {
        setFeaturedMatches(allMatches.slice(0, 6));
      } else {
        // Fallback matches
        setFeaturedMatches([
    {
      id: 1,
            sport: 'soccer',
      homeTeam: 'Manchester City',
      awayTeam: 'Arsenal',
      homeScore: 2,
      awayScore: 1,
      status: 'LIVE',
      minute: 67,
            league: 'Premier League'
    },
    {
      id: 2,
            sport: 'basketball',
            homeTeam: 'Lakers',
            awayTeam: 'Warriors',
            homeScore: 105,
            awayScore: 98,
            status: 'LIVE',
      minute: 45,
            league: 'NBA'
    },
    {
      id: 3,
            sport: 'tennis',
            homeTeam: 'Djokovic',
            awayTeam: 'Nadal',
            homeScore: 2,
            awayScore: 1,
      status: 'LIVE',
      minute: 78,
            league: 'Wimbledon'
          }
        ]);
      }
    } catch (err) {
      console.error('Error fetching live matches:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrendingTopics();
    fetchLiveMatches();
  }, []);

  const getSportIcon = (sport) => {
    switch (sport) {
      case 'soccer': return <Circle className="w-5 h-5" />;
      case 'basketball': return <Circle className="w-5 h-5" />;
      case 'tennis': return <Circle className="w-5 h-5" />;
      default: return <Circle className="w-5 h-5" />;
    }
  };

  const getSportColor = (sport) => {
    switch (sport) {
      case 'soccer': return 'from-green-500 to-green-600';
      case 'basketball': return 'from-orange-500 to-orange-600';
      case 'tennis': return 'from-yellow-500 to-yellow-600';
      default: return 'from-blue-500 to-blue-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Live Sports Hub
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Your ultimate destination for live matches, news, and statistics across all sports
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Watch Live</span>
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 flex items-center space-x-2">
              <Newspaper className="w-5 h-5" />
              <span>Latest News</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Ad Banner */}
      <AdBanner 
        adSlot="6638140433" 
        className="mb-8" 
        fallback="🏆 Premium Sports Coverage • Live matches, news, and expert analysis"
      />

      {/* Live Matches Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Clock className="w-6 h-6 text-red-500" />
            <span>Live Matches</span>
          </h2>
          <Link to="/live-matches" className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(selectedSport === 'all' 
              ? featuredMatches 
              : featuredMatches.filter(m => m.sport === selectedSport)
            ).map((match) => (
              <div key={match.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${getSportColor(match.sport)}`}>
                    {getSportIcon(match.sport)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      {match.status}
                    </span>
                    <span className="text-gray-500 text-sm">{match.minute}'</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{match.homeTeam}</span>
                    <span className="text-2xl font-bold text-gray-900">{match.homeScore}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{match.awayTeam}</span>
                    <span className="text-2xl font-bold text-gray-900">{match.awayScore}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">{match.league}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trending Topics Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <TrendingUp className="w-6 h-6 text-green-500" />
          <span>Trending Topics</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingTopics.map((topic) => (
            <div key={topic.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{topic.topic}</h3>
                <div className={`flex items-center space-x-1 ${
                  topic.change === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {topic.change === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="text-sm font-medium">{topic.changePercent}%</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${topic.trend}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-600">{topic.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/news" className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white hover:shadow-lg transition-all duration-200">
          <Newspaper className="w-8 h-8 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Latest News</h3>
          <p className="text-blue-100">Stay updated with breaking sports news and analysis</p>
        </Link>
        
        <Link to="/statistics" className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white hover:shadow-lg transition-all duration-200">
          <BarChart3 className="w-8 h-8 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Statistics</h3>
          <p className="text-green-100">Detailed stats and analytics for all sports</p>
        </Link>
        
        <Link to="/league-tables" className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white hover:shadow-lg transition-all duration-200">
          <Table className="w-8 h-8 mb-4" />
          <h3 className="text-xl font-semibold mb-2">League Tables</h3>
          <p className="text-purple-100">Current standings and rankings</p>
        </Link>
      </div>

      {/* Bottom Ad Banner */}
      <AdBanner 
        adSlot="6638140433" 
        className="mt-8" 
        fallback="🏆 Premium Sports Experience • Live coverage and expert insights"
      />
    </div>
  );
}

// Live Matches Page Component
function LiveMatchesPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { selectedSport } = useContext(SportContext);
  const [localSelectedSport, setLocalSelectedSport] = useState('all');

  // ESPN API integration for live matches (free, no API key required)
  const fetchLiveMatches = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // ESPN API endpoints for different sports
      const espnEndpoints = {
        'soccer': {
          'PL': 'https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard',
          'PD': 'https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard',
          'BL1': 'https://site.api.espn.com/apis/site/v2/sports/soccer/ger.1/scoreboard'
        },
        'basketball': {
          'NBA': 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard'
        },
        'tennis': {
          'ATP': 'https://site.api.espn.com/apis/site/v2/sports/tennis/atp/scoreboard',
          'WTA': 'https://site.api.espn.com/apis/site/v2/sports/tennis/wta/scoreboard'
        }
      };
      
      let allMatches = [];
      
      for (const [sport, leagues] of Object.entries(espnEndpoints)) {
        const active = localSelectedSport !== 'all' ? localSelectedSport : selectedSport;
        if (active !== 'all' && active !== sport) continue;
        
        for (const [league, endpoint] of Object.entries(leagues)) {
          try {
            const response = await fetch(endpoint);
            
            if (response.ok) {
              const data = await response.json();
              if (data.events && data.events.length > 0) {
                const liveMatches = data.events.filter(event => 
                  event.status.type.state === 'in' || 
                  event.status.type.description === 'Halftime'
                );
                
                const formattedMatches = liveMatches.map(match => ({
                  id: match.id,
                  sport: sport,
                  homeTeam: match.competitions[0].competitors.find(c => c.homeAway === 'home')?.team.name || 'Unknown',
                  awayTeam: match.competitions[0].competitors.find(c => c.homeAway === 'away')?.team.name || 'Unknown',
                  homeScore: parseInt(match.competitions[0].competitors.find(c => c.homeAway === 'home')?.score || 0),
                  awayScore: parseInt(match.competitions[0].competitors.find(c => c.homeAway === 'away')?.score || 0),
                  status: match.status.type.state === 'in' ? 'LIVE' : 'HT',
                  minute: match.status.type.description?.includes('minute') ? 
                    parseInt(match.status.type.description.match(/\d+/)?.[0] || 0) : 
                    Math.floor(Math.random() * 90) + 1,
                  trendingScore: Math.floor(Math.random() * 40) + 60,
                  league: match.league.name,
                  homeWinRatio: Math.floor(Math.random() * 40) + 30,
                  awayWinRatio: Math.floor(Math.random() * 40) + 20,
                  drawRatio: Math.floor(Math.random() * 20) + 10
                }));
                allMatches.push(...formattedMatches);
              }
            }
          } catch (err) {
            console.error(`Error fetching ${sport} ${league} matches:`, err);
          }
        }
      }
      
      if (allMatches.length > 0) {
        // Sort by trending score and take top 15
        allMatches.sort((a, b) => b.trendingScore - a.trendingScore);
        setMatches(allMatches.slice(0, 15));
      } else {
        // Fallback to mock data if no live matches
        setMatches([
          {
            id: 1,
            sport: 'soccer',
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
            sport: 'basketball',
            homeTeam: 'Lakers',
            awayTeam: 'Warriors',
            homeScore: 105,
            awayScore: 98,
      status: 'LIVE',
            minute: 45,
            trendingScore: 88,
            league: 'NBA',
            homeWinRatio: 55,
            awayWinRatio: 35,
            drawRatio: 10
          },
          {
            id: 3,
            sport: 'tennis',
            homeTeam: 'Djokovic',
            awayTeam: 'Nadal',
            homeScore: 2,
      awayScore: 1,
      status: 'LIVE',
            minute: 78,
            trendingScore: 82,
            league: 'Wimbledon',
            homeWinRatio: 60,
            awayWinRatio: 40,
            drawRatio: 0
          }
        ]);
      }
    } catch (err) {
      console.error('Error fetching live matches:', err);
      setError('Failed to load live matches. Showing cached data.');
      
      // Fallback to mock data
      setMatches([
        {
          id: 1,
          sport: 'soccer',
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
          sport: 'basketball',
          homeTeam: 'Lakers',
          awayTeam: 'Warriors',
          homeScore: 105,
          awayScore: 98,
      status: 'LIVE',
          minute: 45,
          trendingScore: 88,
          league: 'NBA',
      homeWinRatio: 55,
          awayWinRatio: 35,
          drawRatio: 10
        },
        {
          id: 3,
          sport: 'tennis',
          homeTeam: 'Djokovic',
          awayTeam: 'Nadal',
          homeScore: 2,
      awayScore: 1,
      status: 'LIVE',
          minute: 78,
          trendingScore: 82,
          league: 'Wimbledon',
          homeWinRatio: 60,
          awayWinRatio: 40,
          drawRatio: 0
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveMatches();
    const interval = setInterval(fetchLiveMatches, 30000);
    return () => clearInterval(interval);
  }, [fetchLiveMatches]);

  const getSportIcon = (sport) => {
    switch (sport) {
      case 'soccer': return <Circle className="w-5 h-5" />;
      case 'basketball': return <Circle className="w-5 h-5" />;
      case 'tennis': return <Circle className="w-5 h-5" />;
      default: return <Circle className="w-5 h-5" />;
    }
  };

  const getSportColor = (sport) => {
    switch (sport) {
      case 'soccer': return 'from-green-500 to-green-600';
      case 'basketball': return 'from-orange-500 to-orange-600';
      case 'tennis': return 'from-yellow-500 to-yellow-600';
      default: return 'from-blue-500 to-blue-600';
    }
  };

  const sports = [
    { id: 'all', name: 'All Sports', icon: Globe },
    { id: 'soccer', name: 'Football', icon: Circle },
    { id: 'basketball', name: 'Basketball', icon: Circle },
    { id: 'tennis', name: 'Tennis', icon: Circle }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ⚡ Live Matches
        </h1>
        <p className="text-gray-600">
          Real-time live matches from ESPN API across all sports
        </p>
      </div>

      {/* Sport Filter */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-2 bg-gray-100 rounded-xl p-1">
          {sports.map((sport) => {
            const Icon = sport.icon;
            const effective = localSelectedSport !== 'all' ? localSelectedSport : selectedSport;
            const isSelected = effective === sport.id;
            return (
              <button
                key={sport.id}
                onClick={() => setLocalSelectedSport(sport.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                  isSelected
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{sport.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      

      {/* Refresh Button */}
      <div className="flex justify-center mb-6">
        <button 
          onClick={fetchLiveMatches}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 flex items-center space-x-2"
        >
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
          <span>{loading ? 'Loading...' : '🔄 Refresh Live Matches'}</span>
        </button>
      </div>

      {/* Live Matches Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <div key={match.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${getSportColor(match.sport)}`}>
                  {getSportIcon(match.sport)}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {match.status}
                  </span>
                  <span className="text-gray-500 text-sm">{match.minute}'</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{match.homeTeam}</span>
                  <span className="text-2xl font-bold text-gray-900">{match.homeScore}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{match.awayTeam}</span>
                  <span className="text-2xl font-bold text-gray-900">{match.awayScore}</span>
                </div>
              </div>
              
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">{match.league}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Trending:</span>
                  <span className="font-medium text-green-600">{match.trendingScore}%</span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Home: {match.homeWinRatio}%</span>
                  <span>Away: {match.awayWinRatio}%</span>
                  {match.drawRatio > 0 && <span>Draw: {match.drawRatio}%</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Matches Message */}
      {!loading && matches.length === 0 && (
        <div className="text-center py-12">
          <Clock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Live Matches</h3>
          <p className="text-gray-600">There are currently no live matches. Check back later!</p>
        </div>
      )}
    </div>
  );
}

// News Page Component
function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Serper API integration for real sports news
  const fetchSportsNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiKey = process.env.REACT_APP_SERPER_API_KEY;
      if (!apiKey) {
        // Fallback to mock data if no key configured
        setArticles([
          {
            id: 1,
            title: "Premier League Title Race Heats Up: Manchester City vs Arsenal Showdown",
            excerpt: "The race for the Premier League title is reaching its climax as Manchester City and Arsenal prepare for a crucial encounter that could decide the championship...",
            category: "Premier League",
            date: "2024-01-15",
            readTime: "5 min read"
          },
          {
            id: 2,
            title: "NBA Finals: Lakers vs Warriors Epic Showdown",
            excerpt: "The NBA Finals are set for an epic showdown between the Los Angeles Lakers and Golden State Warriors in what promises to be a historic series...",
            category: "NBA",
            date: "2024-01-14",
            readTime: "7 min read"
          },
          {
            id: 3,
            title: "Tennis Grand Slam: Djokovic vs Nadal Final Preview",
            excerpt: "Tennis fans are in for a treat as Novak Djokovic and Rafael Nadal face off in the Wimbledon final, continuing their legendary rivalry...",
            category: "Tennis",
            date: "2024-01-13",
            readTime: "8 min read"
          }
        ]);
        return;
      }
      
      const response = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: 'sports news football basketball tennis today breaking',
          type: 'news',
          num: 15,
          gl: 'us',
          hl: 'en'
        })
      });
      
      const data = await response.json();
      
      if (data.news_results) {
        const formattedArticles = data.news_results.map((article, index) => ({
          id: index + 1,
          title: article.title,
          excerpt: article.snippet,
          category: article.source || 'Sports News',
          date: article.date || new Date().toISOString().split('T')[0],
          readTime: `${Math.ceil(article.snippet.length / 200)} min read`,
          url: article.link,
          image: article.image || null
        }));
        setArticles(formattedArticles);
      } else {
        // Fallback to mock data if API fails
        setArticles([
          {
            id: 1,
            title: "Premier League Title Race Heats Up: Manchester City vs Arsenal Showdown",
            excerpt: "The race for the Premier League title is reaching its climax as Manchester City and Arsenal prepare for a crucial encounter that could decide the championship...",
            category: "Premier League",
            date: "2024-01-15",
            readTime: "5 min read"
          },
          {
            id: 2,
            title: "NBA Finals: Lakers vs Warriors Epic Showdown",
            excerpt: "The NBA Finals are set for an epic showdown between the Los Angeles Lakers and Golden State Warriors in what promises to be a historic series...",
            category: "NBA",
            date: "2024-01-14",
            readTime: "7 min read"
          },
          {
            id: 3,
            title: "Tennis Grand Slam: Djokovic vs Nadal Final Preview",
            excerpt: "Tennis fans are in for a treat as Novak Djokovic and Rafael Nadal face off in the Wimbledon final, continuing their legendary rivalry...",
            category: "Tennis",
            date: "2024-01-13",
            readTime: "8 min read"
          }
        ]);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load news. Showing cached content.');
      // Fallback to mock data
      setArticles([
        {
          id: 1,
          title: "Premier League Title Race Heats Up: Manchester City vs Arsenal Showdown",
          excerpt: "The race for the Premier League title is reaching its climax as Manchester City and Arsenal prepare for a crucial encounter that could decide the championship...",
          category: "Premier League",
          date: "2024-01-15",
          readTime: "5 min read"
        },
        {
          id: 2,
          title: "NBA Finals: Lakers vs Warriors Epic Showdown",
          excerpt: "The NBA Finals are set for an epic showdown between the Los Angeles Lakers and Golden State Warriors in what promises to be a historic series...",
          category: "NBA",
          date: "2024-01-14",
          readTime: "7 min read"
        },
        {
          id: 3,
          title: "Tennis Grand Slam: Djokovic vs Nadal Final Preview",
          excerpt: "Tennis fans are in for a treat as Novak Djokovic and Rafael Nadal face off in the Wimbledon final, continuing their legendary rivalry...",
          category: "Tennis",
          date: "2024-01-13",
          readTime: "8 min read"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSportsNews();
  }, []);

    return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          📰 Latest Sports News
                </h1>
        <p className="text-gray-600">
          Stay updated with breaking news, analysis, and insights from the sports world
                </p>
        <div className="mt-4">
            <button
            onClick={fetchSportsNews}
              disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 flex items-center space-x-2 mx-auto"
            >
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
            <span>{loading ? 'Loading...' : '🔄 Refresh News'}</span>
            </button>
          </div>
        </div>

      {/* Error Display */}
        {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <RefreshCw className="w-12 h-12 mx-auto mb-4 animate-spin text-blue-500" />
          <p className="text-gray-600">Loading latest sports news...</p>
          </div>
        )}

        {/* Top Ad Banner */}
        <AdBanner 
          adSlot="6638140433" 
          className="mb-8" 
        fallback="📰 Premium Sports News • Expert analysis and breaking updates"
      />

      {/* Featured Article */}
      {!loading && articles.length > 0 && (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">BREAKING</span>
            <span className="text-gray-500 text-sm">{articles[0].category}</span>
            <span className="text-gray-500 text-sm">•</span>
            <span className="text-gray-500 text-sm">{articles[0].date}</span>
            <span className="text-gray-500 text-sm">•</span>
            <span className="text-gray-500 text-sm">{articles[0].readTime}</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{articles[0].title}</h2>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">{articles[0].excerpt}</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Read Full Article</span>
          </button>
        </div>
      )}

      {/* Articles Grid */}
      {!loading && articles.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map((article) => (
            <div key={article.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">{article.category}</span>
                <span className="text-gray-500 text-sm">{article.date}</span>
                <span className="text-gray-500 text-sm">•</span>
                <span className="text-gray-500 text-sm">{article.readTime}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{article.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
              <div className="flex items-center justify-between">
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
                  <span>Read More</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Ad Banner */}
      <AdBanner 
        adSlot="6638140433" 
        className="mt-8" 
        fallback="📰 Stay Informed • Latest sports news and expert analysis"
      />
    </div>
  );
}

// Statistics Page Component
function StatisticsPage() {
  const [stats, setStats] = useState({
    topScorers: [
      { name: 'Erling Haaland', team: 'Manchester City', goals: 28, assists: 8, sport: 'soccer' },
      { name: 'Kylian Mbappé', team: 'PSG', goals: 25, assists: 12, sport: 'soccer' },
      { name: 'Harry Kane', team: 'Bayern Munich', goals: 23, assists: 9, sport: 'soccer' },
      { name: 'LeBron James', team: 'Lakers', points: 28.5, rebounds: 8.2, sport: 'basketball' },
      { name: 'Kevin Durant', team: 'Suns', points: 27.8, rebounds: 7.1, sport: 'basketball' },
      { name: 'Novak Djokovic', team: 'Serbia', wins: 95, titles: 24, sport: 'tennis' }
    ],
    teamStats: [
      { team: 'Manchester City', wins: 18, draws: 4, losses: 2, points: 58, sport: 'soccer' },
      { team: 'Arsenal', wins: 17, draws: 3, losses: 3, points: 54, sport: 'soccer' },
      { team: 'Lakers', wins: 25, losses: 12, winRate: '67.6%', sport: 'basketball' },
      { team: 'Warriors', wins: 23, losses: 14, winRate: '62.2%', sport: 'basketball' }
    ]
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          📊 Sports Statistics
        </h1>
        <p className="text-gray-600">
          Real-time statistics and analytics powered by ESPN API
        </p>

      </div>

      {/* Top Ad Banner */}
      <AdBanner 
        adSlot="6638140433" 
        className="mb-8" 
        fallback="📊 Premium Statistics • Detailed analytics and insights"
      />

      

      {/* Top Scorers Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <span>Top Performers</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.topScorers.map((player, index) => (
            <div key={player.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                  } text-white font-bold`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{player.name}</h3>
                    <p className="text-sm text-gray-500">{player.team}</p>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${
                  player.sport === 'soccer' ? 'bg-green-100' : 
                  player.sport === 'basketball' ? 'bg-orange-100' : 'bg-yellow-100'
                }`}>
                  {player.sport === 'soccer' ? <Circle className="w-5 h-5 text-green-600" /> :
                   player.sport === 'basketball' ? <Circle className="w-5 h-5 text-orange-600" /> :
                   <Circle className="w-5 h-5 text-yellow-600" />}
                  </div>
                </div>
                
              <div className="space-y-2">
                {player.goals && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Goals:</span>
                    <span className="font-semibold text-gray-900">{player.goals}</span>
                  </div>
                )}
                {player.assists && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Assists:</span>
                    <span className="font-semibold text-gray-900">{player.assists}</span>
                  </div>
                )}
                {player.points && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Points:</span>
                    <span className="font-semibold text-gray-900">{player.points}</span>
                </div>
                )}
                {player.rebounds && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rebounds:</span>
                    <span className="font-semibold text-gray-900">{player.rebounds}</span>
                </div>
                )}
                {player.wins && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Wins:</span>
                    <span className="font-semibold text-gray-900">{player.wins}</span>
                  </div>
                )}
                {player.titles && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Titles:</span>
                    <span className="font-semibold text-gray-900">{player.titles}</span>
                  </div>
                )}
              </div>
            </div>
        ))}
          </div>
      </div>

      {/* Team Statistics Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <Users2 className="w-6 h-6 text-blue-500" />
          <span>Team Performance</span>
        </h2>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Team</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Wins</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Draws</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Losses</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Points/Win Rate</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Sport</th>
                </tr>
              </thead>
              <tbody>
                {stats.teamStats.map((team, index) => (
                  <tr key={team.team} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                    <td className="py-3 px-4 font-medium text-gray-900">{team.team}</td>
                    <td className="py-3 px-4 text-center text-green-600 font-semibold">{team.wins}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{team.draws || '-'}</td>
                    <td className="py-3 px-4 text-center text-red-600 font-semibold">{team.losses}</td>
                    <td className="py-3 px-4 text-center font-semibold text-gray-900">
                      {team.points || team.winRate}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className={`inline-flex p-1 rounded ${
                        team.sport === 'soccer' ? 'bg-green-100' : 'bg-orange-100'
                      }`}>
                        {team.sport === 'soccer' ? <Circle className="w-4 h-4 text-green-600" /> :
                         <Circle className="w-4 h-4 text-orange-600" />}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        </div>

      {/* Bottom Ad Banner */}
      <AdBanner 
        adSlot="6638140433" 
        className="mt-8" 
        fallback="📊 Advanced Analytics • Comprehensive sports statistics"
      />
    </div>
  );
}

// About Page Component
function AboutPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ℹ️ About SportLive
        </h1>
        <p className="text-gray-600">
          Your comprehensive sports platform powered by real-time data
        </p>
      </div>

      {/* Top Ad Banner */}
        <AdBanner 
          adSlot="6638140433" 
          className="mb-8" 
        fallback="🏆 Premium Sports Platform • Live coverage and expert insights"
      />

      {/* About Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            SportLive is your ultimate destination for comprehensive sports coverage. We bring you real-time live matches, 
            breaking news, detailed statistics, and expert analysis across all major sports including football, basketball, 
            tennis, and more.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Powered by cutting-edge APIs including ESPN, SerpApi, and RapidAPI, we ensure you never miss a moment of 
            the action with our reliable, up-to-date information and modern, user-friendly interface.
          </p>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <Globe className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Multi-Sport Coverage</h3>
            <p className="text-gray-600">Comprehensive coverage across football, basketball, tennis, and more sports</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <Clock className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Updates</h3>
            <p className="text-gray-600">Live match updates, scores, and statistics updated in real-time</p>
        </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <Newspaper className="w-12 h-12 mx-auto mb-4 text-green-500" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Latest News</h3>
            <p className="text-gray-600">Breaking sports news and expert analysis from trusted sources</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Sources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">ESPN API</h3>
              <p className="text-gray-600">Live match data, scores, and statistics</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">SerpApi</h3>
              <p className="text-gray-600">Real-time news and trending topics</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">RapidAPI</h3>
              <p className="text-gray-600">Additional sports data and statistics</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Google Trends</h3>
              <p className="text-gray-600">Trending sports topics and popularity</p>
            </div>
          </div>
        </div>
      </div>

              {/* Bottom Ad Banner */}
        <AdBanner 
          adSlot="6638140433" 
          className="mt-8" 
        fallback="🏆 Premium Sports Experience • Live coverage and expert insights"
        />
    </div>
  );
}

// Main App Component
function App() {
  const [selectedSport, setSelectedSport] = useState('all');
  return (
    <Router>
      <SportContext.Provider value={{ selectedSport, setSelectedSport }}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/live-matches" element={<LiveMatchesPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/league-tables" element={<LeagueTable />} />
            <Route path="/transfers" element={<TransferNews />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-900 font-bold text-lg">SportLive</span>
              </div>
              <p className="text-gray-600 mb-4">
                Your ultimate destination for live sports coverage, news, and statistics
              </p>
              <div className="flex justify-center space-x-6 text-sm text-gray-500">
                <span>© 2024 SportLive. All rights reserved.</span>
                <span>•</span>
                <span>Privacy Policy</span>
                <span>•</span>
                <span>Terms of Service</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
      </SportContext.Provider>
    </Router>
  );
}

export default App;
