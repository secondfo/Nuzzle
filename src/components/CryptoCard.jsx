export default function CryptoCard({ coin }) {
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all p-5 w-72 flex flex-col items-center text-center border border-gray-100">
      <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-3">
        <img
          src={coin.image}
          alt={coin.name}
          className="w-10 h-10 rounded-full object-contain"
        />
      </div>

      <h2 className="font-semibold text-lg text-gray-800">{coin.name}</h2>
      <p className="text-gray-500 text-sm uppercase mb-2">{coin.symbol}</p>

      <div className="mt-2">
        <p className="text-2xl font-bold text-gray-900">
          ${coin.current_price.toLocaleString()}
        </p>
        <p
          className={`text-sm mt-1 font-medium ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? "+" : ""}
          {coin.price_change_percentage_24h?.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}
