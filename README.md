# Nuzzle Finance Dashboard 📊

A modern, responsive financial dashboard built with React and Vite that provides real-time tracking of stocks and cryptocurrencies. Nuzzle offers an intuitive interface for monitoring market trends and searching for specific financial instruments.

## 🌟 Features

- **Stock Market Tracking**
  - Real-time stock price updates
  - Top 20 stocks monitoring
  - Percentage change indicators
  - Search functionality for any listed stock

- **Cryptocurrency Dashboard**
  - Live cryptocurrency price tracking
  - Top 20 cryptocurrencies by market cap
  - 24-hour price change visualization
  - Comprehensive crypto search capabilities

- **Modern UI/UX**
  - Clean, intuitive interface
  - Responsive design for all devices
  - Dark/light mode compatibility
  - Interactive data cards

## 🚀 Technologies

- **Frontend Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: TailwindCSS 3.4
- **Data Visualization**: Recharts
- **API Integration**: Axios
- **Routing**: React Router DOM
- **APIs Used**:
  - Finnhub API (Stocks)
  - CoinGecko API (Cryptocurrency)

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/secondfo/Nuzzle.git
   ```

2. Navigate to the project directory:
   ```bash
   cd nuzzle
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your API keys:
   ```env
   VITE_FINNHUB_API_KEY=your_finnhub_api_key
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## 📦 Project Structure

```
nuzzle/
├── src/
│   ├── components/
│   │   ├── CryptoCard.jsx
│   │   ├── Navbar.jsx
│   │   ├── SearchBar.jsx
│   │   └── StockCard.jsx
│   ├── pages/
│   │   ├── Crypto.jsx
│   │   ├── Home.jsx
│   │   └── Stocks.jsx
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
└── package.json
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Finnhub](https://finnhub.io/) for stock market data
- [CoinGecko](https://www.coingecko.com/en/api) for cryptocurrency data
- [TailwindCSS](https://tailwindcss.com/) for the styling system
- [React](https://reactjs.org/) community for the amazing ecosystem
