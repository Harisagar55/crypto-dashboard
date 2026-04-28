import React from 'react';

const SkeletonRow = ({ darkMode }) => {
  return (
    <tr className={`animate-pulse border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
      <td className="p-3 flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />
        <div className="space-y-2">
          <div className={`h-4 w-24 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />
          <div className={`h-3 w-12 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />
        </div>
      </td>
      <td className="p-3">
        <div className={`h-4 w-20 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />
      </td>
      <td className="p-3">
        <div className={`h-4 w-16 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />
      </td>
      <td className="p-3">
        <div className={`h-4 w-28 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />
      </td>
    </tr>
  );
};

export default SkeletonRow;
