export default function StockCard({ stock }) {
  const change = stock.change;

  return (
    <div className="bg-white rounded-2xl shadow p-4 flex justify-between items-center hover:shadow-lg transition">
      <div>
        <h2 className="font-semibold text-lg">{stock.symbol}</h2>
      </div>
      <div className="text-right">
        <p className="font-bold text-gray-800">${stock.price.toFixed(2)}</p>
        <p className={`text-sm font-medium ${change > 0 ? "text-green-500" : "text-red-500"}`}>
          {change.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}
