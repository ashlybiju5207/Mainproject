import React from 'react';
import { useHistory } from 'react-router-dom';
import LogoutIcon from '../images/logout.png'; // Import the logout icon
import './LogoutButton.css'; // Import the CSS for styling

const LogoutButton = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear tokens, update state)
    history.push('/login');
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      <img src={LogoutIcon} alt="Logout Icon" className="logout-icon" />
      Logout
    </button>
  );
};

export default LogoutButton;
