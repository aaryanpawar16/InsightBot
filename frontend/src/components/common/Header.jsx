import React, { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black/70 backdrop-blur-sm fixed w-full z-50 top-0 border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#home" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              <i className="fas fa-robot mr-2"></i>InsightBot
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#home" className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Home</a>
              <a href="#features" className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Features</a>
              <a href="#video-insights" className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Video Insights</a>
              <a href="#about" className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">About</a>
              <a href="#contact" className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Contact</a>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
            <a href="#features" className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Features</a>
            <a href="#video-insights" className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Video Insights</a>
            <a href="#about" className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</a>
            <a href="#contact" className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
