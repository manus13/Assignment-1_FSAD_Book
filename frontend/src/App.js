import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard'; 
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

const App = () => {
    return (
      <Router>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />}></Route>
                </Routes>
        </Router>
    );
};

export default App;
