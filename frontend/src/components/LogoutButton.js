import React from 'react';

function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out');
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
