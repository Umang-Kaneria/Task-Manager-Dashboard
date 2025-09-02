import React from 'react';

const Input = ({ label, type = 'text', className = '', ...props }) => (
  <div className="mb-4">
    {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
    <input
      type={type}
      className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  </div>
);

export default Input;
