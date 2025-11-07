import axios from 'axios';

export const fetchCryptoFromAPI = async (coinId) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        community_data: false,
        developer_data: false
      }
    });
    
    const data = response.data;
    
    if (data.market_data) {
      return {
        price: data.market_data.current_price.usd.toString(),
        change: data.market_data.price_change_24h.toString(),
        changePercent: data.market_data.price_change_percentage_24h.toString()
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching ${coinId}:`, error);
    throw error;
  }
};