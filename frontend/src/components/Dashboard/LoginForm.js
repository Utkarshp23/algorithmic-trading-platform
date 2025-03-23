import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = ({ onClose }) => {
  const [clientId, setClientId] = useState('');
  const [mpin, setMpin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/users/login', {
        clientId,
        mpin
      });

      const { success, jwtToken, userName, message } = response.data;

      if (success) {
        console.log("jwtToken:", jwtToken);
        console.log("userName:", userName);
        localStorage.setItem('token', jwtToken);
        onClose();
        navigate('/dashboard', { state: { userName } });
      } else {
        setError(message);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="login-form">
      <h2>Login to Angel One</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="clientId">Client ID</label>
          <input 
              type="text" 
              id="clientId" 
              name="clientId" 
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              required />
        </div>
        <div className="form-group">
          <label htmlFor="mpin">MPIN</label>
          <input 
              type="password" 
              id="mpin" 
              name="mpin" 
              value={mpin}
              onChange={(e) => setMpin(e.target.value)}
              required />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="button-group">
            <button type="submit">Login</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </div>        
      </form>
    </div>
  );
};

export default LoginForm;