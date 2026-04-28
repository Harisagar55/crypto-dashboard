import React from 'react';

const Navbar = ({ darkMode, setDarkMode, currency, setCurrency, secondsAgo }) => {
  return (
    <header className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          CRYPTO DASHBOARD
        </h1>
        
        <div className="flex items-center gap-4">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className={`p-2 rounded-lg font-bold outline-none transition-all ${
              darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-gray-100 text-black border-gray-200"
            } border`}
          >
            <option value="usd">USD</option>
            <option value="inr">INR</option>
            <option value="eur">EUR</option>
          </select>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg font-semibold transition-all ${
              darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-100 text-black hover:bg-gray-200"
            }`}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <p className={`text-sm font-medium ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></span>
          Live updates every 60s • Updated {secondsAgo}s ago
        </p>
      </div>
    </header>
  );
};

export default Navbar;
