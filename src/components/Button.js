import React from 'react';

const Button = ({ children, className = '', ...props }) => (
  <button
    className={`px-4 py-2 rounded transition font-semibold shadow focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
