import React from 'react';
import Hero from '../components/HomePage/Hero';
import CakeShowcase from '../components/HomePage/CakeShowcase';
import Features from '../components/HomePage/Features';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <CakeShowcase />
      <Features />
    </div>
  );
};

export default HomePage;