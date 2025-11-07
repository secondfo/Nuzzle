import React from 'react';

const StockCard = ({ symbol, data, loading, darkMode }) => {
  if (loading) {
    return (
      <div className={`rounded-lg shadow-md p-6 animate-pulse ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className={`h-4 rounded w-20 mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        <div className={`h-8 rounded w-32 mb-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        <div className={`h-4 rounded w-24 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={`rounded-lg shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{symbol}</h3>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No data available</p>
      </div>
    );
  }

  const price = parseFloat(data.price);
  const change = parseFloat(data.change);
  const changePercent = parseFloat(data.changePercent);
  const isPositive = change >= 0;

  return (
    <div className={`rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{symbol}</h3>
        <svg width="20" height="20" fill="none" stroke={isPositive ? '#22c55e' : '#ef4444'} strokeWidth="2" viewBox="0 0 24 24">
          {isPositive ? (
            <path d="m3 17 6-6 4 4 8-8M21 7v6h-6" />
          ) : (
            <path d="m3 7 6 6 4-4 8 8M21 17v-6h-6" />
          )}
        </svg>
      </div>
      
      <div className="mb-2">
        <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          ${price.toFixed(2)}
        </p>
      </div>
      
      <div className={`flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        <span className="font-semibold">
          {isPositive ? '+' : ''}{change.toFixed(2)}
        </span>
        <span className="ml-2">
          ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
        </span>
      </div>
    </div>
  );
};

export default StockCard;