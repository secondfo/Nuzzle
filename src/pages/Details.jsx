import React from 'react';

const Details = ({ symbol, data, loading, darkMode, onBack }) => {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
          darkMode 
            ? 'bg-gray-800 text-white hover:bg-gray-700' 
            : 'bg-white text-gray-900 hover:bg-gray-50'
        } shadow-md`}
      >
        ← Back
      </button>

      <div className={`rounded-lg shadow-lg p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {symbol}
        </h2>

        {loading ? (
          <div className="animate-pulse">
            <div className={`h-12 rounded w-48 mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            <div className={`h-6 rounded w-32 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          </div>
        ) : data ? (
          <div>
            <div className="mb-6">
              <p className={`text-5xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                ${parseFloat(data.price).toFixed(2)}
              </p>
              <div className={`flex items-center text-xl ${
                parseFloat(data.change) >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                <span className="font-semibold">
                  {parseFloat(data.change) >= 0 ? '+' : ''}{parseFloat(data.change).toFixed(2)}
                </span>
                <span className="ml-2">
                  ({parseFloat(data.change) >= 0 ? '+' : ''}{parseFloat(data.changePercent).toFixed(2)}%)
                </span>
              </div>
            </div>

            <div className={`border-t pt-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Market Information
              </h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Detailed market data and analysis would appear here in a production environment.
              </p>
            </div>
          </div>
        ) : (
          <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
            No data available for {symbol}
          </p>
        )}
      </div>
    </div>
  );
};

export default Details;