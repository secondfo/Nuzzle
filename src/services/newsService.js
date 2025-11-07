import { getTimeAgo } from '../utils/timeUtils';

export const fetchNewsFromAPI = async () => {
  try {
    const response = await fetch('https://cryptopanic.com/api/v1/posts/?auth_token=&public=true');
    const data = await response.json();
    
    if (data.results) {
      return data.results.slice(0, 12).map((item, index) => ({
        id: item.id || index,
        title: item.title,
        source: item.source?.title || 'Unknown Source',
        time: getTimeAgo(item.created_at),
        category: item.currencies?.length > 0 ? 'crypto' : 'stocks',
        url: item.url
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

export const FALLBACK_NEWS = [
  { id: 1, title: 'Tech Stocks Rally as AI Innovation Continues', source: 'Financial Times', time: '2 hours ago', category: 'stocks' },
  { id: 2, title: 'Bitcoin Reaches New Monthly High', source: 'CoinDesk', time: '4 hours ago', category: 'crypto' },
  { id: 3, title: 'Federal Reserve Maintains Interest Rates', source: 'Bloomberg', time: '5 hours ago', category: 'stocks' },
  { id: 4, title: 'Ethereum Network Upgrade Shows Promise', source: 'CryptoNews', time: '6 hours ago', category: 'crypto' },
  { id: 5, title: 'Major Banks Report Strong Q4 Earnings', source: 'WSJ', time: '8 hours ago', category: 'stocks' },
  { id: 6, title: 'DeFi Platforms See Increased Activity', source: 'The Block', time: '10 hours ago', category: 'crypto' },
];