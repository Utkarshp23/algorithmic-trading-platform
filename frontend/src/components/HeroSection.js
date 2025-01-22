import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const HeroSection = () => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={fadeIn} className="App-section hero-section">
      <h1 className="text-5xl font-bold mb-4">Welcome to AlgoSphere</h1>
      <p className="text-xl mb-8">Automate your trading strategies with ease</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ripple-button">
        Get Started
      </button>
    </animated.div>
  );
};

export default HeroSection;
