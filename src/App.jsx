import { useEffect, useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import CoinTable from "./components/CoinTable";
import CoinModal from "./components/CoinModal";

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [currency, setCurrency] = useState("usd");
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [secondsAgo, setSecondsAgo] = useState(0);

  // Load theme from local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") setDarkMode(false);
  }, []);

  // Save theme to local storage
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    // Apply theme to body for global consistency
    document.body.className = darkMode ? "bg-gray-900" : "bg-gray-50";
  }, [darkMode]);

  // Fetch data with auto refresh logic
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );
      const data = await response.json();
      setCoins(data);
      setLoading(false);
      setLastUpdate(new Date());
    } catch (err) {
      console.error("Fetch error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [currency]);

  // Timer for "Last updated" indicator
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsAgo(Math.floor((new Date() - lastUpdate) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [lastUpdate]);

  // Performance Optimization: useMemo for filtering
  const filteredCoins = useMemo(() => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  }, [coins, search]);

  // Stats logic for Gainers & Losers
  const topGainers = useMemo(() =>
    [...coins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 3),
    [coins]);

  const topLosers = useMemo(() =>
    [...coins].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h).slice(0, 3),
    [coins]);

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans p-4 md:p-8 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      }`}>
      <div className="max-w-6xl mx-auto">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          currency={currency}
          setCurrency={setCurrency}
          secondsAgo={secondsAgo}
        />

        {/* Stats Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <StatCard title="Top Gainers 🚀" data={topGainers} type="gain" darkMode={darkMode} />
            <StatCard title="Top Losers 📉" data={topLosers} type="loss" darkMode={darkMode} />
          </div>
        )}

        {/* Search Bar */}
        <div className="relative mb-8 group">
          <input
            type="text"
            placeholder="Search assets by name or symbol..."
            className={`w-full p-4 pl-12 rounded-2xl outline-none border transition-all shadow-sm ${darkMode
                ? "bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:bg-gray-800/80"
                : "bg-white border-gray-200 text-black focus:border-blue-500"
              }`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
            🔍
          </span>
        </div>

        {/* Assets Table */}
        <CoinTable
          coins={filteredCoins.slice(0, 10)}
          loading={loading}
          currency={currency}
          darkMode={darkMode}
          setSelectedCoin={setSelectedCoin}
          search={search}
        />

        {/* Detail Modal */}
        <CoinModal
          coin={selectedCoin}
          currency={currency}
          darkMode={darkMode}
          onClose={() => setSelectedCoin(null)}
        />
      </div>
    </div>
  );
}

// Internal Helper Component for Stats
const StatCard = ({ title, data, type, darkMode }) => (
  <div className={`p-6 rounded-3xl border ${darkMode ? "bg-gray-800/40 border-gray-800" : "bg-white border-gray-100 shadow-sm"
    }`}>
    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 mb-4">{title}</h2>
    <div className="space-y-3">
      {data.map((coin) => (
        <div key={coin.id} className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={coin.image} className="w-5 h-5 rounded-full" alt="" />
            <span className="text-sm font-bold">{coin.name}</span>
          </div>
          <span className={`text-sm font-black font-mono ${type === 'gain' ? 'text-green-500' : 'text-red-500'}`}>
            {type === 'gain' ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default App;
