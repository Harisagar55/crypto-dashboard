import React from 'react';
import CoinRow from './CoinRow';
import SkeletonRow from './SkeletonRow';

const CoinTable = ({ coins, loading, currency, darkMode, setSelectedCoin, search }) => {
  return (
    <div className={`rounded-2xl overflow-hidden border ${darkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-100 bg-white'} shadow-sm`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className={`${darkMode ? 'bg-gray-800/50 text-gray-400' : 'bg-gray-50 text-gray-500'} text-xs uppercase tracking-widest font-bold`}>
              <th className="p-4">Coin</th>
              <th className="p-4">Price</th>
              <th className="p-4">24h Change</th>
              <th className="p-4">Market Cap</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              [...Array(10)].map((_, i) => <SkeletonRow key={i} darkMode={darkMode} />)
            ) : coins.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-12 text-center text-gray-500 font-medium">
                  No assets found matching "{search}"
                </td>
              </tr>
            ) : (
              coins.map((coin) => (
                <CoinRow
                  key={coin.id}
                  coin={coin}
                  currency={currency}
                  darkMode={darkMode}
                  onClick={setSelectedCoin}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoinTable;
