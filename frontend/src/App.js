import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import HeroSection from './components/Dashboard/HeroSection';
import FeaturesSection from './components/Dashboard/FeaturesSection';
import LineGraph from './components/Dashboard/LineGraph';
import BrokerSetupPage from './components/Dashboard/BrokerSetupPage';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const [transition, setTransition] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetStartedClick = () => {
    setTransition(true);
    setTimeout(() => {
      navigate('/broker-setup');
    }, 500); // Duration of the transition effect
  };

  useEffect(() => {
    if (transition) {
      setTimeout(() => {
        setTransition(false);
      }, 500); // Reset transition after the same duration
    }
  }, [transition]);

  return (
    <div className={`App ${transition ? 'transition' : ''}`}>
      {location.pathname === '/' && (
        <header className="App-header">
          <LineGraph />
          <h1 className="typing-effect">
            <span className="symbol">&lt;</span>AlgoSphere<span className="symbol">/&gt;</span>
          </h1>
        </header>
      )}
      <main>
        <Routes>
          <Route path="/broker-setup" element={<BrokerSetupPage />} />
          <Route path="/" element={<>
            <HeroSection onGetStartedClick={handleGetStartedClick} />
            <FeaturesSection />
          </>} />
        </Routes>
      </main>
      {location.pathname === '/' && (
        <button className="sticky-cta" onClick={handleGetStartedClick}>Get Started</button>
      )}
    </div>
  );
};

export default App;
