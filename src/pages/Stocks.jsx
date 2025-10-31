import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import StockCard from "../components/StockCard";
import SearchBar from "../components/SearchBar";

export default function Stocks() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "d420h5pr01qreojo52i0d420h5pr01qreojo52ig";

  // Top 20 stocks
  const top20Symbols = useMemo(() => [
    "AAPL","MSFT","GOOGL","AMZN","TSLA","NVDA","META","NFLX","AMD",
    "INTC","ORCL","CSCO","CRM","ADBE","PYPL","BABA","UBER","LYFT",
    "QCOM","TXN"
  ], []);

  const fetchStocks = useCallback(async (symbols) => {
    setLoading(true);
    const results = [];
    for (let symbol of symbols) {
      try {
        const res = await axios.get("https://finnhub.io/api/v1/quote", {
          params: { symbol, token: API_KEY },
        });
        if (res.data && res.data.c) {
          results.push({ symbol, price: res.data.c, change: res.data.dp });
        }
      } catch (err) {
        console.warn(`Failed ${symbol}:`, err);
      }
    }
    setStocks(results);
    setLoading(false);
  }, [API_KEY]);

  const handleSearchSelect = async (symbol) => {
    await fetchStocks([symbol]);
  };

  useEffect(() => {
    fetchStocks(top20Symbols);
  }, [fetchStocks, top20Symbols]);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading stocks...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        💹 Stock Dashboard
      </h1>

      {/* Search Bar */}
      <SearchBar apiKey={API_KEY} onSelect={handleSearchSelect} placeholder="Search for a stock..." />

      {/* Stocks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stocks.map((stock) => (
          <StockCard key={stock.symbol} stock={stock} />
        ))}
      </div>
    </div>
  );
}
