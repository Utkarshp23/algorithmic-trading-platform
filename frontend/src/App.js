import React from 'react';
import './App.css';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import LineGraph from './components/LineGraph';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LineGraph />
        <h1 className="typing-effect">
          <span className="symbol">&lt;</span>AlgoSphere<span className="symbol">/&gt;</span>
        </h1>
      </header>
      <main>
        <HeroSection />
        <FeaturesSection />
        {/* <UserAuthentication /> */}
      </main>
      <button className="sticky-cta">Get Started</button>
    </div>
  );
}

export default App;
