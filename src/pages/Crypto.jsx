import React from 'react';
import SearchBar from '../components/SearchBar';
import StockCard from '../components/StockCard';
import { CRYPTO_SYMBOLS } from '../config/constants';

const Crypto = ({ darkMode, onSearch, cryptoData, loading }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Cryptocurrency Market
        </h2>
        <SearchBar 
          onSelect={onSearch} 
          placeholder="Search for crypto (e.g., BTC, ETH)..."
          darkMode={darkMode}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CRYPTO_SYMBOLS.map((symbol) => (
          <StockCard
            key={symbol}
            symbol={symbol}
            data={cryptoData[symbol]}
            loading={loading[symbol]}
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  );
};

export default Crypto;