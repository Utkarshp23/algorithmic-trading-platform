import React from 'react';
import './LoginForm.css';

const LoginForm = ({ onClose }) => {
  return (
    <div className="login-form">
      <h2>Login to Angel One</h2>
      <form>
        <div className="form-group">
          <label htmlFor="clientId">Client ID</label>
          <input type="text" id="clientId" name="clientId" required />
        </div>
        <div className="form-group">
          <label htmlFor="mpin">MPIN</label>
          <input type="password" id="mpin" name="mpin" required />
        </div>
        <div className="button-group">
            <button type="submit">Login</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </div>        
      </form>
    </div>
  );
};

export default LoginForm;