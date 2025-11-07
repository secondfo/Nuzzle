import React, { useState } from 'react';
import { TOP_STOCKS, CRYPTO_SYMBOLS } from '../config/constants';

const SearchBar = ({ onSelect, placeholder, darkMode }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const allSymbols = [...TOP_STOCKS, ...CRYPTO_SYMBOLS];

  const handleInputChange = (value) => {
    setQuery(value);
    if (value.trim()) {
      const filtered = allSymbols.filter(s => 
        s.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (symbol) => {
    onSelect(symbol);
    setQuery('');
    setSuggestions([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      handleSelect(query.toUpperCase());
    }
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className={`w-full px-4 py-3 pl-12 rounded-lg border ${
            darkMode 
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        />
        <svg className={`absolute left-4 top-3.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </div>
      
      {suggestions.length > 0 && (
        <div className={`absolute w-full mt-2 rounded-lg shadow-lg overflow-hidden z-50 ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          {suggestions.map((symbol) => (
            <div
              key={symbol}
              onClick={() => handleSelect(symbol)}
              className={`px-4 py-3 cursor-pointer ${
                darkMode 
                  ? 'hover:bg-gray-700 text-white' 
                  : 'hover:bg-gray-50 text-gray-900'
              }`}
            >
              {symbol}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;