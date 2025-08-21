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
    { id: 'all', name: 'All Sports', icon: Globe, color: 'ds-accent-blue' },
    { id: 'soccer', name: 'Football', icon: Circle, color: 'ds-accent-green' },
    { id: 'basketball', name: 'Basketball', icon: Circle, color: 'ds-accent-yellow' },
    { id: 'tennis', name: 'Tennis', icon: Circle, color: 'ds-accent-yellow' },
    { id: 'hockey', name: 'Hockey', icon: Circle, color: 'ds-accent-blue' },
    { id: 'cricket', name: 'Cricket', icon: Circle, color: 'ds-accent-green' },
    { id: 'rugby', name: 'Rugby', icon: Circle, color: 'ds-error' }
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
    <nav className="ds-navbar backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-ds-accent-blue rounded-xl flex items-center justify-center shadow-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl">SportLive</span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 ds-secondary w-5 h-5" />
              <input
                type="text"
                placeholder="Search sports, teams, players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ds-input w-full pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-ds-accent-blue focus:border-transparent transition-all duration-200"
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
                      ? 'bg-ds-accent-blue text-white font-medium shadow-md'
                      : 'text-ds-text-secondary hover:text-ds-accent-blue hover:bg-ds-surface-elev'
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
            <button className="p-2 text-ds-text-secondary hover:text-ds-accent-blue hover:bg-ds-surface-elev rounded-xl transition-all duration-200">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-ds-text-secondary hover:text-ds-accent-blue hover:bg-ds-surface-elev rounded-xl transition-all duration-200">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 text-ds-text-secondary hover:text-ds-accent-blue hover:bg-ds-surface-elev rounded-xl transition-all duration-200">
              <User className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-ds-text-secondary hover:text-ds-accent-blue p-2 rounded-xl hover:bg-ds-surface-elev transition-all duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Sports Filter Bar */}
        <div className="hidden md:flex items-center space-x-4 py-3 border-t border-ds-border">
          <span className="text-sm font-medium ds-secondary">Sports:</span>
          <div className="flex space-x-2">
            {sports.map((sport) => {
              const Icon = sport.icon;
              const isSelected = selectedSport === sport.id;
              return (
                <button
                  key={sport.id}
                  onClick={() => setSelectedSport(sport.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                    isSelected ? 'ds-chip-active' : 'ds-chip hover:border-ds-border-light'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="ds-secondary">{sport.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-ds-border">
            {/* Mobile Search */}
            <div className="py-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ds-text-muted w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search sports, teams, players..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-ds-surface-elev border border-ds-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ds-accent-blue focus:border-transparent"
                />
              </div>
            </div>

            {/* Mobile Sports Filter */}
            <div className="py-3 border-b border-ds-border">
              <span className="text-sm font-medium text-ds-text-secondary mb-2 block">Sports:</span>
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
                          ? `bg-${sport.color} text-white shadow-md`
                          : 'text-ds-text-secondary hover:text-white hover:bg-ds-surface-elev'
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
                        ? 'bg-ds-accent-blue text-white font-medium shadow-md'
                        : 'text-ds-text-secondary hover:text-ds-accent-blue hover:bg-ds-surface-elev'
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
        setTrendingTopics([]);
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
          trend: 0,
          change: 'up',
          changePercent: 0
        }));
        
        setTrendingTopics(trendingData);
      } else {
        setTrendingTopics([]);
      }
    } catch (err) {
      console.error('Error fetching trends:', err);
      setTrendingTopics([]);
    }
  };

  // ESPN API integration for live matches
  const fetchLiveMatches = useCallback(async () => {
    try {
      const espnEndpoints = {
        'soccer': 'https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard',
        'basketball': 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard',
        'tennis': 'https://site.api.espn.com/apis/site/v2/sports/tennis/atp/scoreboard',
        'hockey': 'https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard',
        'cricket': 'https://site.api.espn.com/apis/site/v2/sports/cricket/ipl/scoreboard',
        'rugby': 'https://site.api.espn.com/apis/site/v2/sports/rugby/nrl/scoreboard'
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
                  0,
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
        setFeaturedMatches([]);
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
      case 'soccer': return <Circle className="w-5 h-5 text-ds-accent-green" />;
      case 'basketball': return <Circle className="w-5 h-5 text-ds-accent-yellow" />;
      case 'tennis': return <Circle className="w-5 h-5 text-ds-accent-yellow" />;
      case 'hockey': return <Circle className="w-5 h-5 text-ds-accent-blue" />;
      case 'cricket': return <Circle className="w-5 h-5 text-ds-accent-green" />;
      case 'rugby': return <Circle className="w-5 h-5 text-ds-error" />;
      default: return <Circle className="w-5 h-5 text-ds-accent-blue" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="ds-card-elev rounded-2xl p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Live Sports Hub
          </h1>
          <p className="text-xl md:text-2xl mb-8 ds-secondary">
            Your ultimate destination for live matches, news, and statistics across all sports
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="ds-btn-primary px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Watch Live</span>
            </button>
            <button className="ds-btn-outline px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2">
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
          <h2 className="text-2xl font-bold flex items-center space-x-2">
            <Clock className="w-6 h-6" />
            <span>Live Matches</span>
          </h2>
          <Link to="/live-matches" className="font-medium flex items-center space-x-1 ds-secondary hover:opacity-80">
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="ds-card rounded-xl p-6 shadow-sm animate-pulse">
                <div className="h-4 bg-ds-surface-elev rounded mb-4"></div>
                <div className="h-6 bg-ds-surface-elev rounded mb-2"></div>
                <div className="h-4 bg-ds-surface-elev rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(selectedSport === 'all' 
              ? featuredMatches 
              : featuredMatches.filter(m => m.sport === selectedSport)
            ).map((match) => (
              <div key={match.id} className="ds-card rounded-xl p-6 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-ds-surface-elev">
                    {getSportIcon(match.sport)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs px-2 py-1 rounded-full font-medium bg-ds-accent-green text-black">
                      {match.status}
                    </span>
                    <span className="ds-secondary text-sm">{match.minute}'</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{match.homeTeam}</span>
                    <span className="text-2xl font-bold">{match.homeScore}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{match.awayTeam}</span>
                    <span className="text-2xl font-bold">{match.awayScore}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-ds-border">
                  <p className="text-sm ds-secondary">{match.league}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Trending Topics Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center space-x-2">
          <TrendingUp className="w-6 h-6" />
          <span>Trending Topics</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingTopics.map((topic) => (
            <div key={topic.id} className="ds-card rounded-xl p-6 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{topic.topic}</h3>
                <div className={`flex items-center space-x-1 ${
                  topic.change === 'up' ? 'text-ds-success' : 'text-ds-error'
                }`}>
                  {topic.change === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="text-sm font-medium">{topic.changePercent}%</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-ds-surface-elev rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-300 bg-ds-accent-blue"
                    style={{ width: `${topic.trend}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium ds-secondary">{topic.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/news" className="ds-card-elev rounded-xl p-6 hover:shadow-lg transition-all duration-200">
          <Newspaper className="w-8 h-8 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Latest News</h3>
          <p className="ds-secondary">Stay updated with breaking sports news and analysis</p>
        </Link>
        
        <Link to="/statistics" className="ds-card-elev rounded-xl p-6 hover:shadow-lg transition-all duration-200">
          <BarChart3 className="w-8 h-8 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Statistics</h3>
          <p className="ds-secondary">Detailed stats and analytics for all sports</p>
        </Link>
        
        <Link to="/league-tables" className="ds-card-elev rounded-xl p-6 hover:shadow-lg transition-all duration-200">
          <Table className="w-8 h-8 mb-4" />
          <h3 className="text-xl font-semibold mb-2">League Tables</h3>
          <p className="ds-secondary">Current standings and rankings</p>
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
  const { selectedSport, setSelectedSport } = useContext(SportContext);

  // ESPN API integration for live matches (free, no API key required)
  const fetchLiveMatches = useCallback(async () => {
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
        },
        'hockey': {
          'NHL': 'https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard'
        },
        'cricket': {
          'IPL': 'https://site.api.espn.com/apis/site/v2/sports/cricket/ipl/scoreboard'
        },
        'rugby': {
          'NRL': 'https://site.api.espn.com/apis/site/v2/sports/rugby/nrl/scoreboard'
        }
      };
      
      let allMatches = [];
      
      for (const [sport, leagues] of Object.entries(espnEndpoints)) {
        if (selectedSport !== 'all' && selectedSport !== sport) continue;
        
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
                    0,
                  league: match.league.name
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
        setMatches(allMatches.slice(0, 15));
      } else {
        setMatches([]);
      }
    } catch (err) {
      console.error('Error fetching live matches:', err);
      setError('Failed to load live matches. Please try again later.');
      setMatches([]);
    } finally {
      setLoading(false);
    }
  }, [selectedSport]);

  useEffect(() => {
    fetchLiveMatches();
    const interval = setInterval(fetchLiveMatches, 30000);
    return () => clearInterval(interval);
  }, [fetchLiveMatches]);

  const getSportIcon = (sport) => {
    switch (sport) {
      case 'soccer': return <Circle className="w-5 h-5 text-ds-accent-green" />;
      case 'basketball': return <Circle className="w-5 h-5 text-ds-accent-yellow" />;
      case 'tennis': return <Circle className="w-5 h-5 text-ds-accent-yellow" />;
      case 'hockey': return <Circle className="w-5 h-5 text-ds-accent-blue" />;
      case 'cricket': return <Circle className="w-5 h-5 text-ds-accent-green" />;
      case 'rugby': return <Circle className="w-5 h-5 text-ds-error" />;
      default: return <Circle className="w-5 h-5 text-ds-accent-blue" />;
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
        <h1 className="text-3xl font-bold mb-4">
          ⚡ Live Matches
        </h1>
        <p className="ds-secondary">
          Real-time live matches from ESPN API across all sports
        </p>
      </div>

      {/* Sport Filter */}
      <div className="flex justify-center mb-8">
        <div className="flex space-x-2 ds-card-elev rounded-xl p-1">
          {sports.map((sport) => {
            const Icon = sport.icon;
            const isSelected = selectedSport === sport.id;
            return (
              <button
                key={sport.id}
                onClick={() => setSelectedSport(sport.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                  isSelected ? 'ds-chip-active' : 'ds-chip'
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
          className="ds-btn-primary px-6 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 flex items-center space-x-2"
        >
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
          <span>{loading ? 'Loading...' : '🔄 Refresh Live Matches'}</span>
        </button>
      </div>

      {/* Live Matches Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="ds-card rounded-xl p-6 shadow-sm animate-pulse">
              <div className="h-4 bg-ds-surface-elev rounded mb-4"></div>
              <div className="h-6 bg-ds-surface-elev rounded mb-2"></div>
              <div className="h-4 bg-ds-surface-elev rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <div key={match.id} className="ds-card rounded-xl p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-ds-surface-elev">
                  {getSportIcon(match.sport)}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-ds-error text-white text-xs px-2 py-1 rounded-full font-medium">
                    {match.status}
                  </span>
                  <span className="ds-secondary text-sm">{match.minute}'</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{match.homeTeam}</span>
                  <span className="text-2xl font-bold">{match.homeScore}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{match.awayTeam}</span>
                  <span className="text-2xl font-bold">{match.awayScore}</span>
                </div>
              </div>
              
              <div className="space-y-2 pt-4 border-t border-ds-border">
                <p className="ds-secondary">{match.league}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Matches Message */}
      {!loading && matches.length === 0 && (
        <div className="text-center py-12">
          <Clock className="w-16 h-16 mx-auto mb-4 text-ds-text-muted" />
          <h3 className="text-xl font-semibold mb-2">No Live Matches</h3>
          <p className="ds-secondary">There are currently no live matches. Check back later!</p>
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
        setArticles([]);
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
        setArticles([]);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load news. Please try again later.');
      setArticles([]);
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
        <h1 className="text-3xl font-bold mb-4">
          📰 Latest Sports News
                </h1>
        <p className="ds-secondary">
          Stay updated with breaking news, analysis, and insights from the sports world
                </p>
        <div className="mt-4">
            <button
            onClick={fetchSportsNews}
              disabled={loading}
            className="ds-btn-primary px-6 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 flex items-center space-x-2 mx-auto"
            >
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
            <span>{loading ? 'Loading...' : '🔄 Refresh News'}</span>
            </button>
          </div>
        </div>

      {/* Error Display */}
        {error && (
        <div className="error-state rounded-xl p-4 mb-6 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <RefreshCw className="w-12 h-12 mx-auto mb-4 animate-spin text-ds-accent-blue" />
          <p className="ds-secondary">Loading latest sports news...</p>
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
        <div className="ds-card rounded-xl p-8 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <span className="bg-ds-error text-white text-xs px-3 py-1 rounded-full font-medium">BREAKING</span>
            <span className="ds-secondary text-sm">{articles[0].category}</span>
            <span className="ds-secondary text-sm">•</span>
            <span className="ds-secondary text-sm">{articles[0].date}</span>
            <span className="ds-secondary text-sm">•</span>
            <span className="ds-secondary text-sm">{articles[0].readTime}</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">{articles[0].title}</h2>
          <p className="ds-secondary text-lg mb-6 leading-relaxed">{articles[0].excerpt}</p>
          <button className="ds-btn-outline px-8 py-3 rounded-xl font-semibold transition-colors flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Read Full Article</span>
          </button>
        </div>
      )}

      {/* Articles Grid */}
      {!loading && articles.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map((article) => (
            <div key={article.id} className="ds-card rounded-xl p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-ds-accent-blue text-white text-xs px-2 py-1 rounded-full font-medium">{article.category}</span>
                <span className="ds-secondary text-sm">{article.date}</span>
                <span className="ds-secondary text-sm">•</span>
                <span className="ds-secondary text-sm">{article.readTime}</span>
              </div>
              <h3 className="font-semibold mb-3 line-clamp-2">{article.title}</h3>
              <p className="ds-secondary mb-4 line-clamp-3">{article.excerpt}</p>
              <div className="flex items-center justify-between">
                <button className="text-ds-accent-blue hover:opacity-80 font-medium flex items-center space-x-1">
                  <span>Read More</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-ds-text-muted hover:text-white rounded-lg hover:bg-ds-surface-elev transition-colors">
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-ds-text-muted hover:text-white rounded-lg hover:bg-ds-surface-elev transition-colors">
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
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-4">
          📊 Sports Statistics
        </h1>
        <p className="ds-secondary">
          Real-time statistics and analytics powered by ESPN API
        </p>

      </div>

      <div className="text-center py-12">
        <Clock className="w-16 h-16 mx-auto mb-4 text-ds-text-muted" />
        <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
        <p className="ds-secondary">This feature is under development. Please check back later!</p>
      </div>
    </div>
  );
}

// About Page Component
function AboutPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold mb-4">
          ℹ️ About SportLive
        </h1>
        <p className="ds-secondary">
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
        <div className="ds-card rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="ds-secondary leading-relaxed mb-6">
            SportLive is your ultimate destination for comprehensive sports coverage. We bring you real-time live matches, 
            breaking news, detailed statistics, and expert analysis across all major sports including football, basketball, 
            tennis, and more.
          </p>
          <p className="ds-secondary leading-relaxed">
            Powered by cutting-edge APIs including ESPN, SerpApi, and RapidAPI, we ensure you never miss a moment of 
            the action with our reliable, up-to-date information and modern, user-friendly interface.
          </p>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="ds-card rounded-xl p-6 shadow-sm text-center">
            <Globe className="w-12 h-12 mx-auto mb-4 text-ds-accent-blue" />
            <h3 className="text-xl font-semibold mb-2">Multi-Sport Coverage</h3>
            <p className="ds-secondary">Comprehensive coverage across football, basketball, tennis, and more sports</p>
          </div>
          
          <div className="ds-card rounded-xl p-6 shadow-sm text-center">
            <Clock className="w-12 h-12 mx-auto mb-4 text-ds-error" />
            <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
            <p className="ds-secondary">Live match updates, scores, and statistics updated in real-time</p>
        </div>
          
          <div className="ds-card rounded-xl p-6 shadow-sm text-center">
            <Newspaper className="w-12 h-12 mx-auto mb-4 text-ds-accent-green" />
            <h3 className="text-xl font-semibold mb-2">Latest News</h3>
            <p className="ds-secondary">Breaking sports news and expert analysis from trusted sources</p>
          </div>
        </div>

        <div className="ds-card rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Data Sources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">ESPN API</h3>
              <p className="ds-secondary">Live match data, scores, and statistics</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">SerpApi</h3>
              <p className="ds-secondary">Real-time news and trending topics</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">RapidAPI</h3>
              <p className="ds-secondary">Additional sports data and statistics</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Google Trends</h3>
              <p className="ds-secondary">Trending sports topics and popularity</p>
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
      <div className="min-h-screen bg-ds-bg">
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
        <footer className="bg-ds-surface border-t border-ds-border mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-ds-accent-blue rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">SportLive</span>
              </div>
              <p className="ds-secondary mb-4">
                Your ultimate destination for live sports coverage, news, and statistics
              </p>
              <div className="flex justify-center space-x-6 text-sm text-ds-text-muted">
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