export const fetchCryptoFromAPI = async (coinId) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false`
    );
    const data = await response.json();
    
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