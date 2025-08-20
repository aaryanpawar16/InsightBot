import React from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import './assets/styles/main.css';

function App() {
  return (
    <div className="bg-black text-gray-200">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
