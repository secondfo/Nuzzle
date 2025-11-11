import axios from 'axios';
import { getTimeAgo } from '../utils/timeUtils';

const MARKETAUX_API_KEY = import.meta.env.VITE_MARKETAUX_API_KEY;

const TRACKED_SYMBOLS = ['TSLA', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'BTC', 'ETH'];

export const fetchNewsFromAPI = async () => {
  if (!MARKETAUX_API_KEY) {
    console.warn('Marketaux API key not found. Using fallback news.');
    return FALLBACK_NEWS;
  }

  try {
    const response = await axios.get('https://api.marketaux.com/v1/news/all', {
      params: {
        symbols: TRACKED_SYMBOLS.join(','),
        filter_entities: true,
        limit: 12,
        language: 'en',
        api_token: MARKETAUX_API_KEY
      }
    });
    
    if (response.data.data) {
      return response.data.data.map((article, index) => {
        // Determine category based on entities mentioned
        const isCrypto = article.entities?.some(entity => 
          ['BTC', 'ETH', 'cryptocurrency', 'blockchain'].includes(entity.symbol || entity.name)
        );
        
        return {
          id: article.uuid || index,
          title: article.title,
          source: article.source || 'Unknown Source',
          time: getTimeAgo(article.published_at),
          category: isCrypto ? 'crypto' : 'stocks',
          url: article.url,
          image: article.image_url || '/default-news-image.jpg',
          snippet: article.description || ''
        };
      });
    }
    
    console.warn('No news data received. Using fallback news.');
    return FALLBACK_NEWS;
  } catch (error) {
    console.error('Error fetching news:', error);
    return FALLBACK_NEWS;  // Use fallback instead of throwing
  }
};


export const FALLBACK_NEWS = [
  { 
    id: 1, 
    title: 'Tech Stocks Rally as AI Innovation Continues', 
    source: 'Financial Times', 
    time: '2 hours ago', 
    category: 'stocks',
    url: '#'
  },
  { 
    id: 2, 
    title: 'Bitcoin Reaches New Monthly High', 
    source: 'CoinDesk', 
    time: '4 hours ago', 
    category: 'crypto',
    url: '#'
  },
  { 
    id: 3, 
    title: 'Federal Reserve Maintains Interest Rates', 
    source: 'Bloomberg', 
    time: '5 hours ago', 
    category: 'stocks',
    url: '#'
  },
  { 
    id: 4, 
    title: 'Ethereum Network Upgrade Shows Promise', 
    source: 'CryptoNews', 
    time: '6 hours ago', 
    category: 'crypto',
    url: '#'
  },
  { 
    id: 5, 
    title: 'Major Banks Report Strong Q4 Earnings', 
    source: 'WSJ', 
    time: '8 hours ago', 
    category: 'stocks',
    url: '#'
  },
  { 
    id: 6, 
    title: 'DeFi Platforms See Increased Activity', 
    source: 'The Block', 
    time: '10 hours ago', 
    category: 'crypto',
    url: '#'
  },
];