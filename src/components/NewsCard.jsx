import React from 'react';

const NewsCard = ({ news, darkMode }) => {
  const handleClick = () => {
    if (news.url && news.url !== '#') {
      window.open(news.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`rounded-lg shadow-md p-6 hover:shadow-lg transition-all cursor-pointer transform hover:scale-105 ${
        darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs px-2 py-1 rounded-full ${
          news.category === 'crypto' 
            ? 'bg-purple-100 text-purple-700' 
            : 'bg-blue-100 text-blue-700'
        }`}>
          {news.category}
        </span>
        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {news.time}
        </span>
      </div>
      
      <h3 className={`text-lg font-semibold mb-2 line-clamp-2 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        {news.title}
      </h3>
      
      <div className="flex justify-between items-center">
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {news.source}
        </p>
        
        {news.url && news.url !== '#' && (
          <svg 
            className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default NewsCard;