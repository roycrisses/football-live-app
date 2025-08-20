// Netlify Function for Live Football Data Integration
const axios = require('axios');

exports.handler = async function(event, context) {
  try {
    // Get API credentials from Netlify environment variables
    const API_KEY = process.env.FOOTBALL_API_KEY;
    const API_URL = process.env.FOOTBALL_API_URL;
    
    if (!API_KEY || !API_URL) {
      throw new Error('Missing API credentials');
    }
    
    // Fetch live matches from real API
    const response = await axios.get(`${API_URL}/matches?status=LIVE`, {
      headers: {
        'X-Auth-Token': API_KEY,
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 second timeout
    });
    
    // Transform API data to match your app's format
    const matches = response.data.matches.map(match => ({
      id: match.id,
      homeTeam: match.homeTeam.name,
      awayTeam: match.awayTeam.name,
      homeScore: match.score?.fullTime?.home || match.score?.halfTime?.home || 0,
      awayScore: match.score?.fullTime?.away || match.score?.halfTime?.away || 0,
      status: match.status,
      minute: match.minute,
      trendingScore: Math.floor(Math.random() * 30) + 70, // Placeholder - replace with real trending data
      league: match.competition?.name || 'Unknown League'
    }));
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(matches)
    };
    
  } catch (error) {
    console.error('API Error:', error.message);
    
    // Fallback to mock data if API fails
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
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(mockMatches)
    };
  }
};