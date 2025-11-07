/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navigation from './components/Navbar';
import HomePage from './pages/Home';
import StocksPage from './pages/Stocks';
import CryptoPage from './pages/Crypto';
import DetailPage from './pages/Details';
import { fetchNewsFromAPI, FALLBACK_NEWS } from './services/newsService';
import { fetchStockFromAPI } from './services/stockService';
import { fetchCryptoFromAPI } from './services/cryptoService';
import { TOP_STOCKS, TOP_CRYPTO, CRYPTO_SYMBOLS, CRYPTO_MAP } from './config/constants';

function AppContent() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [stockData, setStockData] = useState({});
  const [cryptoData, setCryptoData] = useState({});
  const [loading, setLoading] = useState({});
  const [newsData, setNewsData] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);

  const fetchNews = async () => {
    setLoadingNews(true);
    try {
      const news = await fetchNewsFromAPI();
      setNewsData(news);
    } catch (error) {
      setNewsData(FALLBACK_NEWS);
    } finally {
      setLoadingNews(false);
    }
  };

  const fetchStockData = async (symbol) => {
    setLoading(prev => ({ ...prev, [symbol]: true }));
    try {
      const data = await fetchStockFromAPI(symbol);
      setStockData(prev => ({ ...prev, [symbol]: data }));
    } catch (error) {
      setStockData(prev => ({ ...prev, [symbol]: null }));
    } finally {
      setLoading(prev => ({ ...prev, [symbol]: false }));
    }
  };

  const fetchCryptoData = async (coinId, symbol) => {
    setLoading(prev => ({ ...prev, [symbol]: true }));
    try {
      const data = await fetchCryptoFromAPI(coinId);
      setCryptoData(prev => ({ ...prev, [symbol]: data }));
    } catch (error) {
      setCryptoData(prev => ({ ...prev, [symbol]: null }));
    } finally {
      setLoading(prev => ({ ...prev, [symbol]: false }));
    }
  };

  useEffect(() => {
    fetchNews();
    TOP_STOCKS.forEach((symbol, index) => {
      setTimeout(() => fetchStockData(symbol), index * 1000);
    });
    TOP_CRYPTO.forEach((coinId, index) => {
      const symbol = CRYPTO_SYMBOLS[index];
      setTimeout(() => fetchCryptoData(coinId, symbol), (index + TOP_STOCKS.length) * 1000);
    });
  }, []);

  const handleSearch = (symbol, type) => {
    if (type === 'stock' && !stockData[symbol]) {
      fetchStockData(symbol);
    } else if (type === 'crypto' && !cryptoData[symbol]) {
      const coinId = CRYPTO_MAP[symbol] || symbol.toLowerCase();
      fetchCryptoData(coinId, symbol);
    }
    
    // Navigate to detail page
    navigate(`/detail/${type}/${symbol}`);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <Navigation 
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                darkMode={darkMode} 
                onSearch={handleSearch}
                newsData={newsData}
                loadingNews={loadingNews}
              />
            } 
          />
          <Route 
            path="/stocks" 
            element={
              <StocksPage 
                darkMode={darkMode} 
                onSearch={handleSearch}
                stockData={stockData}
                loading={loading}
              />
            } 
          />
          <Route 
            path="/crypto" 
            element={
              <CryptoPage 
                darkMode={darkMode} 
                onSearch={handleSearch}
                cryptoData={cryptoData}
                loading={loading}
              />
            } 
          />
          <Route 
            path="/detail/:type/:symbol" 
            element={
              <DetailPage
                stockData={stockData}
                cryptoData={cryptoData}
                loading={loading}
                darkMode={darkMode}
              />
            } 
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;