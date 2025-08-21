import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { TrendingUp, Clock, Users, AlertCircle, RefreshCw, Zap, Trophy, Target, Home, Newspaper, BarChart3, Info, Menu, X, Table, RefreshCw as TransferIcon } from 'lucide-react';
import AdBanner from './AdBanner';
import LeagueTable from './components/LeagueTable';
import TransferNews from './components/TransferNews';

// Home Page Component
function HomePage() {
  const [featuredMatches] = useState([
    {
      id: 1,
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
      homeTeam: 'Barcelona',
      awayTeam: 'Real Madrid',
      homeScore: 1,
      awayScore: 1,
      status: 'HT',
      minute: 45,
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
      league: 'Bundesliga'
    }
  ]);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          🔥 Your Ultimate Football Companion
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Live scores, expert analysis, and comprehensive football coverage
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/live-matches" className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold transition-colors">
            View Live Matches
          </Link>
          <Link to="/news" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Read Latest News
          </Link>
        </div>
      </div>

      {/* Featured Matches */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
          Featured Live Matches
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredMatches.map((match) => (
            <div key={match.id} className="glass rounded-xl p-4">
              <div className="text-center mb-3">
                <span className="text-xs text-gray-400">{match.league}</span>
                <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium text-white ml-2 ${match.status === 'LIVE' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                  {match.status} {match.minute && `• ${match.minute}'`}
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{match.homeTeam}</span>
                  <span className="text-2xl font-bold text-yellow-400">{match.homeScore}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{match.awayTeam}</span>
                  <span className="text-2xl font-bold text-yellow-400">{match.awayScore}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">📊 Live Statistics</h3>
          <p className="text-gray-300 mb-4">
            Get real-time statistics, possession data, and performance metrics for all live matches.
          </p>
          <Link to="/statistics" className="text-yellow-400 hover:text-yellow-300 font-medium">
            View Statistics →
          </Link>
        </div>
        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">🏆 League Tables</h3>
          <p className="text-gray-300 mb-4">
            Check current standings, form, and positions for all major European leagues.
          </p>
          <Link to="/league-tables" className="text-yellow-400 hover:text-yellow-300 font-medium">
            View Tables →
          </Link>
        </div>
        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">🔄 Transfer News</h3>
          <p className="text-gray-300 mb-4">
            Stay updated with the latest transfer rumors, confirmed deals, and market updates.
          </p>
          <Link to="/transfer-news" className="text-yellow-400 hover:text-yellow-300 font-medium">
            View Transfers →
          </Link>
        </div>
        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">📰 Latest News</h3>
          <p className="text-gray-300 mb-4">
            Breaking news, transfer updates, and expert opinions from the football world.
          </p>
          <Link to="/news" className="text-yellow-400 hover:text-yellow-300 font-medium">
            Read News →
          </Link>
        </div>
      </div>

      {/* Ad Banner */}
      <AdBanner 
        adSlot="6638140433" 
        className="my-8" 
        fallback="⚽ Premium Football Content • Stay updated with live scores and expert analysis"
      />
    </div>
  );
}

// Live Matches Page Component
function LiveMatchesPage() {
  const [matches] = useState([
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
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'LIVE': return 'bg-red-500';
      case 'HT': return 'bg-yellow-500';
      case 'FT': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'LIVE': return <Zap className="w-3 h-3" />;
      case 'HT': return <Clock className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          🔥 Live Football Matches
        </h1>
        <p className="text-gray-300">
          Real-time scores, predictions, and trending analysis
        </p>
      </div>

      {/* Top Ad Banner */}
      <AdBanner 
        adSlot="6638140433" 
        className="mb-8" 
        fallback="🔥 Premium Football Content • Stay updated with live scores and predictions"
      />

      {/* Top Trending Matches Grid */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center justify-center">
          <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
          Top 10 Trending Matches
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {matches.map((match, index) => (
            <div key={match.id} className="glass rounded-xl p-4 match-card hover:scale-105 transition-all duration-200">
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
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Ad Banner */}
      <AdBanner 
        adSlot="6638140433" 
        className="mt-8" 
        fallback="🎯 Win Prediction Analytics • Advanced football insights and trends"
      />
    </div>
  );
}

// News Page Component
function NewsPage() {
  const [articles] = useState([
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
      title: "Transfer Window Update: Latest Rumors and Confirmed Deals",
      excerpt: "The January transfer window is in full swing with several high-profile moves already completed and more expected before the deadline...",
      category: "Transfers",
      date: "2024-01-14",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Champions League: Road to the Final - Quarter-Final Preview",
      excerpt: "Eight teams remain in the hunt for European football's biggest prize. Here's our comprehensive preview of the quarter-final matchups...",
      category: "Champions League",
      date: "2024-01-13",
      readTime: "8 min read"
    },
    {
      id: 4,
      title: "Tactical Analysis: How Modern Football Has Evolved",
      excerpt: "From pressing systems to possession-based play, modern football tactics have transformed the beautiful game. We analyze the key trends...",
      category: "Analysis",
      date: "2024-01-12",
      readTime: "10 min read"
    },
    {
      id: 5,
      title: "Young Talents to Watch: The Next Generation of Football Stars",
      excerpt: "Discover the emerging talents who are set to dominate world football in the coming years. Our scouts identify the brightest prospects...",
      category: "Youth",
      date: "2024-01-11",
      readTime: "6 min read"
    },
    {
      id: 6,
      title: "Women's Football: Record-Breaking Attendance and Growing Popularity",
      excerpt: "Women's football continues to break barriers with record attendances and growing global interest. We examine the factors behind this surge...",
      category: "Women's Football",
      date: "2024-01-10",
      readTime: "4 min read"
    }
  ]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          📰 Latest Football News
        </h1>
        <p className="text-gray-300">
          Stay updated with breaking news, analysis, and insights from the football world
        </p>
      </div>

      {/* Top Ad Banner */}
      <AdBanner 
        adSlot="6638140433" 
        className="mb-8" 
        fallback="📰 Premium Football News • Expert analysis and breaking updates"
      />

      {/* Featured Article */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-3">
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">BREAKING</span>
          <span className="text-gray-400 text-sm">{articles[0].category}</span>
          <span className="text-gray-400 text-sm">•</span>
          <span className="text-gray-400 text-sm">{articles[0].date}</span>
          <span className="text-gray-400 text-sm">•</span>
          <span className="text-gray-400 text-sm">{articles[0].readTime}</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">{articles[0].title}</h2>
        <p className="text-gray-300 text-lg mb-4">{articles[0].excerpt}</p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-semibold transition-colors">
          Read Full Article
        </button>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(1).map((article) => (
          <div key={article.id} className="glass rounded-xl p-6 hover:scale-105 transition-transform">
            <div className="flex items-center space-x-2 mb-3">
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">{article.category}</span>
              <span className="text-gray-400 text-sm">{article.date}</span>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-400 text-sm">{article.readTime}</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">{article.title}</h3>
            <p className="text-gray-300 mb-4">{article.excerpt}</p>
            <button className="text-yellow-400 hover:text-yellow-300 font-medium">
              Read More →
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Ad Banner */}
      <AdBanner 
        adSlot="6638140433" 
        className="mt-8" 
        fallback="📰 Stay Informed • Latest football news and expert analysis"
      />
    </div>
  );
}

// Statistics Page Component
function StatisticsPage() {
  const [stats] = useState({
    topScorers: [
      { name: 'Erling Haaland', team: 'Manchester City', goals: 28, assists: 8 },
      { name: 'Kylian Mbappé', team: 'PSG', goals: 25, assists: 12 },
      { name: 'Harry Kane', team: 'Bayern Munich', goals: 23, assists: 9 },
      { name: 'Victor Osimhen', team: 'Napoli', goals: 22, assists: 6 },
      { name: 'Lautaro Martínez', team: 'Inter Milan', goals: 21, assists: 7 }
    ],
    topAssists: [
      { name: 'Kevin De Bruyne', team: 'Manchester City', assists: 18, goals: 5 },
      { name: 'Bruno Fernandes', team: 'Manchester United', assists: 16, goals: 8 },
      { name: 'Lionel Messi', team: 'Inter Miami', assists: 15, goals: 12 },
      { name: 'Jude Bellingham', team: 'Real Madrid', assists: 14, goals: 15 },
      { name: 'Bukayo Saka', team: 'Arsenal', assists: 13, goals: 9 }
    ],
    leagueStats: [
      { league: 'Premier League', avgGoals: 2.8, avgCards: 3.2, topTeam: 'Arsenal' },
      { league: 'La Liga', avgGoals: 2.6, avgCards: 3.5, topTeam: 'Real Madrid' },
      { league: 'Bundesliga', avgGoals: 3.1, avgCards: 2.8, topTeam: 'Bayer Leverkusen' },
      { league: 'Serie A', avgGoals: 2.7, avgCards: 3.8, topTeam: 'Inter Milan' },
      { league: 'Ligue 1', avgGoals: 2.9, avgCards: 3.1, topTeam: 'PSG' }
    ]
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          📊 Football Statistics
        </h1>
        <p className="text-gray-300">
          Comprehensive stats, rankings, and performance metrics
        </p>
      </div>

      {/* Top Ad Banner */}
      <AdBanner 
        adSlot="6638140433" 
        className="mb-8" 
        fallback="📊 Premium Football Statistics • Advanced analytics and insights"
      />

      {/* Top Scorers */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-6">🏆 Top Scorers</h2>
        <div className="glass rounded-xl p-6">
          <div className="space-y-4">
            {stats.topScorers.map((player, index) => (
              <div key={player.name} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-yellow-400">#{index + 1}</span>
                  <div>
                    <h3 className="text-white font-semibold">{player.name}</h3>
                    <p className="text-gray-400 text-sm">{player.team}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-lg">{player.goals} goals</div>
                  <div className="text-gray-400 text-sm">{player.assists} assists</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Assists */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-6">🎯 Top Assists</h2>
        <div className="glass rounded-xl p-6">
          <div className="space-y-4">
            {stats.topAssists.map((player, index) => (
              <div key={player.name} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-blue-400">#{index + 1}</span>
                  <div>
                    <h3 className="text-white font-semibold">{player.name}</h3>
                    <p className="text-gray-400 text-sm">{player.team}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-lg">{player.assists} assists</div>
                  <div className="text-white font-bold text-lg">{player.goals} goals</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* League Statistics */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-6">🏟️ League Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.leagueStats.map((league) => (
            <div key={league.league} className="glass rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">{league.league}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Goals:</span>
                  <span className="text-white font-semibold">{league.avgGoals}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Cards:</span>
                  <span className="text-white font-semibold">{league.avgCards}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Top Team:</span>
                  <span className="text-white font-semibold">{league.topTeam}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Ad Banner */}
      <AdBanner 
        adSlot="6638140433" 
        className="mt-8" 
        fallback="📊 Data-Driven Insights • Comprehensive football statistics and analysis"
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
        <h1 className="text-3xl font-bold text-white mb-4">
          ℹ️ About Football Live
        </h1>
        <p className="text-gray-300">
          Your trusted source for live football updates and analysis
        </p>
      </div>

      {/* Top Ad Banner */}
      <AdBanner 
        adSlot="6638140433" 
        className="mb-8" 
        fallback="ℹ️ Premium Football Content • Learn more about our platform"
      />

      {/* About Content */}
      <div className="glass rounded-xl p-8">
        <div className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-gray-300 text-lg mb-6">
            Football Live is dedicated to providing football fans with the most comprehensive, 
            real-time coverage of the beautiful game. We believe every fan deserves access to 
            live scores, expert analysis, and in-depth statistics.
          </p>

          <h2 className="text-2xl font-bold text-white mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-white mb-3">🔥 Live Matches</h3>
              <p className="text-gray-300">
                Real-time scores, match statistics, and live updates from leagues around the world.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-white mb-3">📰 Latest News</h3>
              <p className="text-gray-300">
                Breaking news, transfer updates, and expert analysis from the football world.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-white mb-3">📊 Statistics</h3>
              <p className="text-gray-300">
                Comprehensive player and team statistics, rankings, and performance metrics.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-white mb-3">🎯 Predictions</h3>
              <p className="text-gray-300">
                AI-powered win predictions and match analysis to enhance your football experience.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-6">Our Commitment</h2>
          <p className="text-gray-300 text-lg mb-6">
            We are committed to maintaining the highest standards of accuracy, reliability, 
            and user experience. Our team of football experts and developers work tirelessly 
            to ensure you have access to the best football content available online.
          </p>

          <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
          <p className="text-gray-300 text-lg">
            For any questions, suggestions, or feedback, please don't hesitate to reach out. 
            We value your input and are always looking to improve our platform.
          </p>
        </div>
      </div>

      {/* Bottom Ad Banner */}
      <AdBanner 
        adSlot="6638140433" 
        className="mt-8" 
        fallback="ℹ️ Get in Touch • Contact us for questions and feedback"
      />
    </div>
  );
}

// Navigation Component
function Navigation({ isOpen, setIsOpen }) {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { path: '/live-matches', label: 'Live Matches', icon: <Zap className="w-5 h-5" /> },
    { path: '/league-tables', label: 'League Tables', icon: <Table className="w-5 h-5" /> },
    { path: '/transfer-news', label: 'Transfers', icon: <TransferIcon className="w-5 h-5" /> },
    { path: '/news', label: 'News', icon: <Newspaper className="w-5 h-5" /> },
    { path: '/statistics', label: 'Statistics', icon: <BarChart3 className="w-5 h-5" /> },
    { path: '/about', label: 'About', icon: <Info className="w-5 h-5" /> }
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        <span>Menu</span>
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-b border-white/10 z-40">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-yellow-500 text-black'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-yellow-500 text-black'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}

// Main App Component
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-black" />
                </div>
                <Link to="/" className="text-2xl font-bold text-white header-title hover:text-yellow-400 transition-colors">
                  🔥 Football Live
                </Link>
              </div>
              
              <Navigation isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/live-matches" element={<LiveMatchesPage />} />
            <Route path="/league-tables" element={<LeagueTable />} />
            <Route path="/transfer-news" element={<TransferNews />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-black/20 backdrop-blur-md border-t border-white/10 mt-16 no-print">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-gray-400 text-sm">
              <p>🔥 Football Live • Your ultimate football companion</p>
              <p className="mt-2">
                <Link to="/" className="hover:text-white transition-colors">Home</Link> • 
                <Link to="/live-matches" className="hover:text-white transition-colors ml-2">Live Matches</Link> • 
                <Link to="/league-tables" className="hover:text-white transition-colors ml-2">League Tables</Link> • 
                <Link to="/transfer-news" className="hover:text-white transition-colors ml-2">Transfers</Link> • 
                <Link to="/news" className="hover:text-white transition-colors ml-2">News</Link> • 
                <Link to="/statistics" className="hover:text-white transition-colors ml-2">Statistics</Link> • 
                <Link to="/about" className="hover:text-white transition-colors ml-2">About</Link>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
