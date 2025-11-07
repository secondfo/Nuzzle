/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navbar';
import Home from './pages/Home';
import Stocks from './pages/Stocks';
import Crypto from './pages/Crypto';
import Details from './pages/Details';
import { fetchNewsFromAPI, FALLBACK_NEWS } from './services/newsService';
import { fetchStockFromAPI } from './services/stockService';
import { fetchCryptoFromAPI } from './services/cryptoService';
import { TOP_STOCKS, TOP_CRYPTO, CRYPTO_SYMBOLS, CRYPTO_MAP } from './config/constants';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [stockData, setStockData] = useState({});
  const [cryptoData, setCryptoData] = useState({});
  const [loading, setLoading] = useState({});
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
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

  const handleSearch = (symbol) => {
    const isStock = TOP_STOCKS.includes(symbol);
    const isCrypto = CRYPTO_SYMBOLS.includes(symbol);
    const type = isCrypto ? 'crypto' : 'stock';
    
    setSelectedSymbol(symbol);
    setSelectedType(type);
    
    if (type === 'stock' && !stockData[symbol]) {
      fetchStockData(symbol);
    } else if (type === 'crypto' && !cryptoData[symbol]) {
  const coinId = CRYPTO_MAP[symbol] || symbol.toLowerCase();
  fetchCryptoData(coinId, symbol);
  }
  };
  const handleBack = () => {
  setSelectedSymbol(null);
  setSelectedType(null);
  };
  const toggleDarkMode = () => {
  setDarkMode(!darkMode);
  };
  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
    <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
    />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {selectedSymbol ? (
        <Details
        symbol={selectedSymbol}
        data={selectedType === 'crypto' ? cryptoData[selectedSymbol] : stockData[selectedSymbol]}
        loading={loading[selectedSymbol]}
        darkMode={darkMode}
        onBack={handleBack}
      />
       ) : currentPage === 'home' ? (
      <Home
        darkMode={darkMode} 
        onSearch={handleSearch}
        newsData={newsData}
        loadingNews={loadingNews}
      />
      ) : currentPage === 'stocks' ? (
      <Stocks
        darkMode={darkMode} 
        onSearch={handleSearch}
        stockData={stockData}
        loading={loading}
      />
      ) : (
        <Crypto
        darkMode={darkMode} 
        onSearch={handleSearch}
        cryptoData={cryptoData}
        loading={loading}
      />
      )}
  </div>
</div>
  );
}


export default App;