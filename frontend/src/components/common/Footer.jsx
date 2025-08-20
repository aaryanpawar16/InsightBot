import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500">&copy; 2025 InsightBot. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300"><i className="fab fa-twitter text-xl"></i></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300"><i className="fab fa-github text-xl"></i></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300"><i className="fab fa-linkedin text-xl"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
