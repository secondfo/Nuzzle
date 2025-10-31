function CryptoCard({ coin }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex items-center justify-between hover:shadow-lg transition">
      <div className="flex items-center gap-3">
        <img src={coin.image} alt={coin.name} className="w-10 h-10" />
        <div>
          <h2 className="font-semibold text-lg">{coin.name}</h2>
          <p className="text-gray-500 text-sm uppercase">{coin.symbol}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-gray-800">${coin.current_price.toLocaleString()}</p>
        <p
          className={`text-sm font-medium ${
            coin.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {coin.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}
export default CryptoCard;