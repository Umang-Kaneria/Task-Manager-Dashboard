import React from 'react';

const Select = ({ label, options = [], className = '', ...props }) => (
  <div className="mb-4">
    {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
    <select
      className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export default Select;
