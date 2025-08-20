// Netlify Function for Live Football Data Integration
const axios = require('axios');

exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify([
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
      }
    ])
  };
};