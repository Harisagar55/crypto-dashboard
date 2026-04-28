import React from 'react';
import PriceChart from './PriceChart';

const CoinModal = ({ coin, currency, darkMode, onClose }) => {
  if (!coin) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div 
        className={`${darkMode ? "bg-gray-900 text-white border-gray-800" : "bg-white text-black border-gray-100"} 
        border p-8 rounded-3xl w-full max-w-lg shadow-2xl transform transition-all scale-100 animate-in zoom-in-95 duration-200`}
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-2xl bg-blue-500/10">
              <img src={coin.image} className="w-10 h-10" alt={coin.name} />
            </div>
            <div>
              <h2 className="text-3xl font-black leading-tight">{coin.name}</h2>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{coin.symbol}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
              darkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-500"
            }`}
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className={`p-4 rounded-2xl ${darkMode ? "bg-gray-800/40" : "bg-blue-50/50"} border ${darkMode ? "border-gray-800" : "border-blue-100"}`}>
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Current Price</p>
            <p className="text-xl font-mono font-bold text-blue-500">{currency.toUpperCase()} {coin.current_price.toLocaleString()}</p>
          </div>
          <div className={`p-4 rounded-2xl ${darkMode ? "bg-gray-800/40" : "bg-purple-50/50"} border ${darkMode ? "border-gray-800" : "border-purple-100"}`}>
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">24h High/Low</p>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-green-500">H: {coin.high_24h?.toLocaleString()}</span>
              <span className="text-xs font-bold text-red-500">L: {coin.low_24h?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <DetailRow label="Market Cap" value={`${currency.toUpperCase()} ${coin.market_cap.toLocaleString()}`} darkMode={darkMode} />
          <DetailRow label="Total Volume" value={`${currency.toUpperCase()} ${coin.total_volume.toLocaleString()}`} darkMode={darkMode} />
          <DetailRow label="Circulating Supply" value={`${coin.circulating_supply.toLocaleString()} ${coin.symbol.toUpperCase()}`} darkMode={darkMode} />
        </div>

        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-black text-gray-400 text-[10px] uppercase tracking-[0.2em]">7-Day Price Trend</h3>
          <span className="text-[10px] text-blue-500 font-bold uppercase">Live Chart</span>
        </div>
        
        <PriceChart coinId={coin.id} currency={currency} />

        <button
          onClick={onClose}
          className="mt-8 w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]"
        >
          Close Dashboard
        </button>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, darkMode }) => (
  <div className={`flex justify-between items-center py-2 border-b ${darkMode ? "border-gray-800" : "border-gray-50"}`}>
    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</span>
    <span className={`text-sm font-mono font-bold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{value}</span>
  </div>
);

export default CoinModal;
