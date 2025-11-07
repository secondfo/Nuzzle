import axios from 'axios';
import { getTimeAgo } from '../utils/timeUtils';

// Get your free API key from https://newsapi.org/register
const NEWS_API_KEY = 'e46a0327bc5846e59c15e8f78fe3b93f'; // Replace with your actual key

export const fetchNewsFromAPI = async () => {
  try {
    // Fetch business/finance news
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'stock market OR cryptocurrency OR bitcoin OR blockchain',
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: 12,
        apiKey: NEWS_API_KEY
      }
    });
    
    if (response.data.articles) {
      return response.data.articles.map((article, index) => ({
        id: article.url || index,
        title: article.title,
        source: article.source.name || 'Unknown Source',
        time: getTimeAgo(article.publishedAt),
        category: determineCategoryFromArticle(article),
        url: article.url,
        image: article.urlToImage
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

// Helper function to determine if article is about crypto or stocks
const determineCategoryFromArticle = (article) => {
  const text = `${article.title} ${article.description}`.toLowerCase();
  const cryptoKeywords = ['bitcoin', 'ethereum', 'crypto', 'blockchain', 'btc', 'eth', 'defi', 'nft'];
  
  const isCrypto = cryptoKeywords.some(keyword => text.includes(keyword));
  return isCrypto ? 'crypto' : 'stocks';
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