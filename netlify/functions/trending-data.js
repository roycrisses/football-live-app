const axios = require('axios');

exports.handler = async function(event, context) {
  try {
    // Get team names from query parameters
    const { homeTeam, awayTeam } = event.queryStringParameters || {};
    
    if (!homeTeam || !awayTeam) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Both homeTeam and awayTeam are required' })
      };
    }
    
    // For now, return mock trending data
    // In production, integrate with Google Trends API or similar
    const trendingData = {
      homeTeamTrend: Math.floor(Math.random() * 30) + 70,
      awayTeamTrend: Math.floor(Math.random() * 30) + 70,
      matchTrend: Math.floor(Math.random() * 20) + 80,
      timestamp: new Date().toISOString()
    };
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(trendingData)
    };
    
  } catch (error) {
    console.error('Trending Data Error:', error.message);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Failed to fetch trending data',
        fallback: {
          homeTeamTrend: 75,
          awayTeamTrend: 75,
          matchTrend: 80,
          timestamp: new Date().toISOString()
        }
      })
    };
  }
};
