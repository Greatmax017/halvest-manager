// src/components/Layout/Layout.jsx
import React from 'react';
import Navbar from '../Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen  w-[1500px] mx-auto px-4 py-8 bg-[#F8F9FA]">
      <Navbar />
      <main className="h-full ">
        {children}
      </main>
    </div>
  );
};

export default Layout;