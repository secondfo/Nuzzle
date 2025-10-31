import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";

export default function Crypto() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Top 20 coins by market cap
  const top20Coins = useMemo(() => [
    "bitcoin","ethereum","binancecoin","ripple","cardano","dogecoin",
    "matic-network","solana","polkadot","litecoin","tron","avalanche-2",
    "uniswap","chainlink","cosmos","stellar","ethereum-classic","near","algorand","vechain"
  ], []);

  const fetchCrypto = useCallback(async (ids) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets`,
        {
          params: {
            vs_currency: "usd",
            ids: ids.join(","),
            order: "market_cap_desc",
            per_page: ids.length,
            page: 1,
            sparkline: false
          }
        }
      );
      setCryptos(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, []);

  const handleSearchSelect = async (id) => {
    await fetchCrypto([id]);
  };

  useEffect(() => {
    fetchCrypto(top20Coins);
  }, [fetchCrypto, top20Coins]);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading crypto...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        💰 Crypto Dashboard
      </h1>

      {/* Reusable SearchBar */}
      <SearchBar onSelect={handleSearchSelect} placeholder="Search for a crypto..." type="crypto" />

      {/* Crypto Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cryptos.map((coin) => (
          <div key={coin.id} className="bg-white rounded-2xl shadow p-4 flex justify-between items-center hover:shadow-lg transition">
            <div>
              <h2 className="font-semibold text-lg">{coin.symbol.toUpperCase()}</h2>
              <p className="text-gray-500 text-sm">{coin.name}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800">${coin.current_price.toFixed(2)}</p>
              <p className={`text-sm font-medium ${coin.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}`}>
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
