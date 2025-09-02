import React from 'react';

const PageContainer = ({ children, showHeader = true, onLogout, title = 'Dashboard', showBack = false, onBack }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    {showHeader && (
      <header className="w-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg rounded-b-lg mb-8 flex items-center justify-between py-6 px-8">
        <h1 className="text-3xl font-bold text-white tracking-wide">{title}</h1>
        <div className="flex items-center gap-4">
          {showBack && (
            <button className="bg-white text-blue-600 font-semibold px-4 py-2 rounded shadow hover:bg-blue-100 transition" onClick={onBack}>Back to Dashboard</button>
          )}
          {onLogout && (
            <button className="bg-white text-blue-600 font-semibold px-4 py-2 rounded shadow hover:bg-blue-100 transition" onClick={onLogout}>Logout</button>
          )}
        </div>
      </header>
    )}
    <main className="flex-1 w-full max-w-4xl mx-auto p-4">
      {children}
    </main>
  </div>
);

export default PageContainer;
