import { useState } from "react";
import axios from "axios";

export default function SearchBar({ onSelect, placeholder = "Search...", type = "stock", apiKey }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setResults([]);
      return;
    }

    try {
      if (type === "stock") {
        const res = await axios.get("https://finnhub.io/api/v1/search", {
          params: { q: value, token: apiKey },
        });
        setResults(res.data.result.filter(r => r.symbol));
      } else if (type === "crypto") {
        // CoinGecko search endpoint
        const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${value}`);
        setResults(res.data.coins); // array of coins
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mb-6 w-full max-w-2xl mx-auto relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="border rounded-xl p-2 w-full focus:outline-none shadow"
      />
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white rounded-xl shadow mt-1 max-h-60 overflow-y-auto z-50">
          {results.map((item) => (
            <div
              key={type === "stock" ? item.symbol : item.id}
              className="p-2 hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => {
                onSelect(type === "stock" ? item.symbol : item.id);
                setQuery("");
                setResults([]);
              }}
            >
              {type === "stock" ? `${item.symbol} - ${item.description}` : `${item.name} (${item.symbol.toUpperCase()})`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
