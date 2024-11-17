import React, { useState } from 'react';
import axios from 'axios';
import './styles/Auth.css';
import { useNavigate, Link } from 'react-router-dom';



const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const url = isLogin 
          ? 'http://localhost:5000/api/auth/login' 
          : 'http://localhost:5000/api/auth/register';
  
      try {
          const response = await axios.post(url, { username, email, password });
          if (isLogin) {
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('userId', response.data.userId); 
              alert('Login successful!');
              navigate('/dashboard'); 
          } else {
              alert('Registration successful!');
          }
      } catch (error) {
          alert('Error: ' + error.response.data.message);
      }
  };

    return (
      <div className="container">
          <h1>{isLogin ? 'Login' : 'Register'}</h1>
          <form onSubmit={handleSubmit}>
              {!isLogin && (
                  <div className="form-group">
                      <label className="label">Username</label>
                      <input
                          type="text"
                          className="input"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                      />
                  </div>
              )}
              <div className="form-group">
                  <label className="label">Email</label>
                  <input
                      type="email"
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                  />
              </div>
              <div className="form-group">
                  <label className="label">Password</label>
                  <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  />
              </div>
              <button type="submit" className="button">{isLogin ? 'Login' : 'Register'}</button>
          </form>
          <p className="message">
              {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
              <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Register' : 'Login'}</button>
          </p>
          {isLogin && (
                <div className="forgot-password-link">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
            )}
      </div>
  );
};

export default Auth;
