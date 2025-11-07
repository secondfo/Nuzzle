/* eslint-disable no-unused-vars */
import React from 'react';
import SearchBar from '../components/SearchBar';
import NewsCard from '../components/NewsCard';
import { TOP_STOCKS, CRYPTO_SYMBOLS } from '../config/constants';

const Home = ({ darkMode, onSearch, newsData, loadingNews }) => {
  const handleSelect = (symbol) => {
    const isStock = TOP_STOCKS.includes(symbol);
    const isCrypto = CRYPTO_SYMBOLS.includes(symbol);
    const type = isCrypto ? 'crypto' : 'stock';
    onSearch(symbol, type);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Welcome to Nuzzle
        </h2>
        <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Track stocks, cryptocurrencies, and stay updated with the latest market news
        </p>
        <SearchBar 
          onSelect={handleSelect} 
          placeholder="Search for any stock or crypto..."
          darkMode={darkMode}
        />
      </div>

      <div>
        <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Latest Market News
        </h3>
        {loadingNews ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`rounded-lg shadow-md p-6 animate-pulse ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className={`h-4 rounded w-20 mb-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                <div className={`h-6 rounded w-full mb-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                <div className={`h-4 rounded w-32 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              </div>
            ))}
          </div>
        ) : newsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsData.map((news) => (
              <NewsCard key={news.id} news={news} darkMode={darkMode} />
            ))}
          </div>
        ) : (
          <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No news available at the moment
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;