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
        changePercent: data.market_data.price_change_percentage_24h.toString(),
        high24h: data.market_data.high_24h?.usd?.toString() || null,
        low24h: data.market_data.low_24h?.usd?.toString() || null,
        marketCap: data.market_data.market_cap?.usd?.toString() || null,
        totalVolume: data.market_data.total_volume?.usd?.toString() || null,
        circulatingSupply: data.market_data.circulating_supply?.toString() || null
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching ${coinId}:`, error);
    throw error;
  }
};