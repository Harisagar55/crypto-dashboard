import React from 'react';

const CoinRow = ({ coin, currency, darkMode, onClick }) => {
  const priceChange = coin.price_change_percentage_24h;

  return (
    <tr
      onClick={() => onClick(coin)}
      className={`cursor-pointer border-b transition-all duration-200 group ${
        darkMode
          ? "border-gray-800 hover:bg-gray-800/50"
          : "border-gray-100 hover:bg-gray-50"
      }`}
    >
      <td className="p-4 flex items-center gap-4">
        <img src={coin.image} className="w-8 h-8 rounded-full shadow-sm" alt={coin.name} />
        <div>
          <p className="font-bold group-hover:text-blue-500 transition-colors">{coin.name}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            {coin.symbol}
          </p>
        </div>
      </td>

      <td className="p-4 font-mono font-semibold">
        {currency.toUpperCase()} {coin.current_price.toLocaleString()}
      </td>

      <td
        className={`p-4 font-bold ${
          priceChange >= 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        <div className="flex items-center gap-1">
          {priceChange >= 0 ? "↑" : "↓"}
          {Math.abs(priceChange).toFixed(2)}%
        </div>
      </td>

      <td className="p-4 text-gray-500 font-medium">
        {currency.toUpperCase()} {coin.market_cap.toLocaleString()}
      </td>
    </tr>
  );
};

export default React.memo(CoinRow);
