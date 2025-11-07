import React from 'react';

const NewsCard = ({ news, darkMode }) => {
  return (
    <div className={`rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs px-2 py-1 rounded-full ${
          news.category === 'crypto' 
            ? 'bg-purple-100 text-purple-700' 
            : 'bg-blue-100 text-blue-700'
        }`}>
          {news.category}
        </span>
        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{news.time}</span>
      </div>
      <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {news.title}
      </h3>
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{news.source}</p>
    </div>
  );
};

export default NewsCard;