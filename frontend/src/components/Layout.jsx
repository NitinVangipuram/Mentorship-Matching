import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br  from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Mentorship Matching Platform</h1>
        {children}
      </div>
    </div>
  );
};

export default Layout;