import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Details = ({ stockData, cryptoData, loading, darkMode }) => {
  const { type, symbol } = useParams();
  const navigate = useNavigate();
  
  const data = type === 'crypto' ? cryptoData[symbol] : stockData[symbol];
  const isLoading = loading[symbol];

  const handleBack = () => {
    navigate(-1); //  to previous page
  };

  return (
    <div className="space-y-6">
      <button
        onClick={handleBack}
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

        {isLoading ? (
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Stock-specific fields */}
                {type === 'stock' && (
                  <>
                    <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      <div className="text-sm text-gray-500">Open</div>
                      <div className="font-medium">{data.open ? `$${parseFloat(data.open).toFixed(2)}` : '—'}</div>
                    </div>

                    <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      <div className="text-sm text-gray-500">High</div>
                      <div className="font-medium">{data.high ? `$${parseFloat(data.high).toFixed(2)}` : '—'}</div>
                    </div>

                    <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      <div className="text-sm text-gray-500">Low</div>
                      <div className="font-medium">{data.low ? `$${parseFloat(data.low).toFixed(2)}` : '—'}</div>
                    </div>

                    <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      <div className="text-sm text-gray-500">Previous Close</div>
                      <div className="font-medium">{data.previousClose ? `$${parseFloat(data.previousClose).toFixed(2)}` : '—'}</div>
                    </div>

                    <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      <div className="text-sm text-gray-500">Volume</div>
                      <div className="font-medium">{data.volume ? Number(data.volume).toLocaleString() : '—'}</div>
                    </div>

                    <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      <div className="text-sm text-gray-500">Latest Trading Day</div>
                      <div className="font-medium">{data.latestTradingDay || '—'}</div>
                    </div>
                  </>
                )}

                {/* Crypto-specific fields */}
                {type === 'crypto' && (
                  <>
                    <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      <div className="text-sm text-gray-500">24h High</div>
                      <div className="font-medium">{data.high24h ? `$${parseFloat(data.high24h).toFixed(2)}` : '—'}</div>
                    </div>

                    <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      <div className="text-sm text-gray-500">24h Low</div>
                      <div className="font-medium">{data.low24h ? `$${parseFloat(data.low24h).toFixed(2)}` : '—'}</div>
                    </div>

                    <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      <div className="text-sm text-gray-500">Market Cap</div>
                      <div className="font-medium">{data.marketCap ? `$${Number(data.marketCap).toLocaleString()}` : '—'}</div>
                    </div>

                    <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      <div className="text-sm text-gray-500">24h Volume</div>
                      <div className="font-medium">{data.totalVolume ? `$${Number(data.totalVolume).toLocaleString()}` : '—'}</div>
                    </div>

                    <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      <div className="text-sm text-gray-500">Circulating Supply</div>
                      <div className="font-medium">{data.circulatingSupply ? Number(data.circulatingSupply).toLocaleString() : '—'}</div>
                    </div>
                  </>
                )}
              </div>
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