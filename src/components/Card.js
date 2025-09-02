import React from 'react';

const Card = ({ name, description, children, className = '', onClick }) => (
  <div
    className={`bg-white rounded-lg shadow-md p-6 transition hover:bg-gray-100 cursor-pointer ${className}`}
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    {name && <h3 className="text-lg font-bold mb-2">{name}</h3>}
    {description && <p className="text-gray-600 mb-4">{description}</p>}
    {children}
  </div>
);

export default Card;
