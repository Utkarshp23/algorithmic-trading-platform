import React from 'react';
import './BrokerSetupPage.css';
import angelOneLogo from './../../assets/angel-one-logo.png'; // Add the path to your logo
import upstoxLogo from './../../assets/upstox-logo.jpg'; // Add the path to your logo
import zerodhaLogo from './../../assets/zerodha-logo.jpeg'; // Add the path to your logo

const BrokerSetupPage = () => {
  return (
    <div className="broker-setup-page">
      <div className="content">
        <h1 className="main-text">To continue further you must have a trading account and must have done configuration to access the respective broker APIs</h1>
        <p className="sub-text">Select broker to continue...</p>
        <div className="broker-options">
          <div className="broker-card">
            <img src={angelOneLogo} alt="Angel One" className="broker-logo" />
            <p>Angel One</p>
          </div>
          <div className="broker-card">
            <img src={upstoxLogo} alt="Upstox" className="broker-logo" />
            <p>Upstox</p>
          </div>
          <div className="broker-card">
            <img src={zerodhaLogo} alt="Zerodha" className="broker-logo" />
            <p>Zerodha</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerSetupPage;
