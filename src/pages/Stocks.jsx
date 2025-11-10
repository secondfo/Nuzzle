import React from 'react';
import SearchBar from '../components/SearchBar';
import StockCard from '../components/StockCard';
import { TOP_STOCKS } from '../config/constants';

const Stocks = ({ darkMode, onSearch, stockData, loading }) => {
  const handleSelect = (symbol) => {
    onSearch(symbol, 'stock');
  };

  return (
    <div className="space-y-8">
      <div className='flex flex-col items-center'>
        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Stock Market
        </h2>
        <SearchBar 
          onSelect={handleSelect} 
          placeholder="Search for stocks (e.g., AAPL, TSLA)..."
          darkMode={darkMode}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TOP_STOCKS.map((symbol) => (
          <StockCard
            key={symbol}
            symbol={symbol}
            data={stockData[symbol]}
            loading={loading[symbol]}
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  );
};

export default Stocks;