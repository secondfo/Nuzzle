# Nuzzle �

A modern financial dashboard built with React and Vite that brings real-time market data to life. Featuring a clean, responsive interface with dark mode support for tracking both stocks and cryptocurrencies.

## ✨ Key Features

- **Dark/Light Mode** - Seamless theme switching for comfortable viewing
- **Real-time Data** - Live stock and crypto price updates
- **Responsive Design** - Optimized layout for all screen sizes
- **Unified Cards** - Consistent data presentation across markets
- **Smart Search** - Quick access to any listed financial instrument

## � Quick Start

```bash
# Clone the repository
git clone https://github.com/secondfo/Nuzzle.git

# Install dependencies
cd nuzzle
npm install

# Start development server
npm run dev
```

## 🛠️ Built With

- **React** - UI Components and state management
- **Vite** - Next generation frontend tooling
- **Tailwind CSS** - Utility-first styling
- **Alpha Vantage API** - Real-time market data
- **News API** - Latest financial news

## 📁 Project Structure

```
src/
├── components/
│   ├── CryptoCard.jsx   # Cryptocurrency data display
│   ├── Navbar.jsx       # Navigation and theme toggle
│   ├── NewsCard.jsx     # Financial news article card
│   ├── SearchBar.jsx    # Universal search component
│   └── StockCard.jsx    # Stock market data card
├── pages/
│   ├── Crypto.jsx       # Cryptocurrency dashboard
│   ├── Details.jsx      # Detailed view for stocks/crypto
│   ├── Home.jsx         # Landing page with news
│   └── Stocks.jsx       # Stock market dashboard
├── services/
│   ├── cryptoService.js # CoinGecko API integration
│   ├── newsService.js   # News API integration
│   └── stockService.js  # Alpha Vantage API integration
├── utils/
│   └── timeUtils.js     # Time formatting utilities
├── config/
│   └── constants.js     # Market symbols and config
├── assets/             # Static assets and images
├── App.jsx             # Main application component
├── index.css          # Global styles
└── main.jsx           # Application entry point
```

## 🎨 Theme Support

The app uses Tailwind CSS for theme-aware components:

```jsx
<div className={`text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
  {/* Your content */}
</div>
```

## 💡 Component Examples

**SearchBar:**
```jsx
<SearchBar 
  onSelect={handleSearch}
  placeholder="Search markets..."
  darkMode={darkMode}
/>
```

**StockCard:**
```jsx
<StockCard
  symbol={symbol}
  data={marketData}
  loading={isLoading}
  darkMode={darkMode}
/>
```

## ⚙️ Configuration

Customize tracked symbols in `constants.js`:

```javascript
export const TOP_STOCKS = [
  'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'
];

export const CRYPTO_SYMBOLS = [
  'BTC', 'ETH', 'BNB', 'XRP', 'ADA'
];
```

## 📱 Responsive Design

- **Mobile:** Single column layout
- **Tablet:** 2-column grid
- **Desktop:** 4-column grid with flexible spacing

## 🔑 API Configuration

This project uses two main APIs for market data:

### Alpha Vantage API (Stocks)
1. Sign up for a free API key at [Alpha Vantage](https://www.alphavantage.co/)
2. Create a `.env` file in the root directory
3. Add your API key:
   ```env
   VITE_ALPHA_VANTAGE_API_KEY=your_alphavantage_api_key
   ```

Usage example in the code:
```javascript
const response = await fetch(
  `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${import.meta.env.VITE_ALPHA_VANTAGE_API_KEY}`
);
```

### CoinGecko API (Crypto)
The project uses CoinGecko's free API (no key required) for cryptocurrency data.

Usage example in the code:
```javascript
const response = await fetch(
  `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_24hr_change=true`
);
```

### News API
1. Sign up for a free API key at [News API](https://newsapi.org/)
2. Add your API key to the `.env` file:
   ```env
   VITE_NEWS_API_KEY=your_newsapi_key
   ```

Usage example in the code:
```javascript
const response = await fetch(
  `https://newsapi.org/v2/everything?q=finance&apiKey=${import.meta.env.VITE_NEWS_API_KEY}&pageSize=10`
);
```

## 🙏 Credits

- [Alpha Vantage](https://www.alphavantage.co/) - Real-time stock market data
- [CoinGecko](https://www.coingecko.com/en/api) - Cryptocurrency market data
- [News API](https://newsapi.org/) - Financial news integration
- [React](https://reactjs.org/) - UI framework
- [Vite](https://vitejs.dev/) - Frontend build tool
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- Icons from [Heroicons](https://heroicons.com/)

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project as a template for your own dashboard!

---

Made with ❤️ by [secondfo](https://github.com/secondfo)
