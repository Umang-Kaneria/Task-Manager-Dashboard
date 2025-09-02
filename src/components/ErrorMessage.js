import React from 'react';

const ErrorMessage = ({ message }) => (
  message ? <div className="text-red-600 text-sm mb-2">{message}</div> : null
);

export default ErrorMessage;
