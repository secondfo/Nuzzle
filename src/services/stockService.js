import axios from 'axios';
import { ALPHA_VANTAGE_KEY } from '../config/constants';

export const fetchStockFromAPI = async (symbol) => {
  try {
    const response = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: symbol,
        apikey: ALPHA_VANTAGE_KEY
      }
    });
    
    const data = response.data;
    
    if (data['Global Quote'] && Object.keys(data['Global Quote']).length > 0) {
      const quote = data['Global Quote'];
      return {
        price: quote['05. price'],
        change: quote['09. change'],
        changePercent: quote['10. change percent'].replace('%', ''),
        open: quote['02. open'],
        high: quote['03. high'],
        low: quote['04. low'],
        volume: quote['06. volume'],
        previousClose: quote['08. previous close'],
        latestTradingDay: quote['07. latest trading day']
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching ${symbol}:`, error);
    throw error;
  }
};