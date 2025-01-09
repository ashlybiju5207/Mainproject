import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './land.css';
import meterImage from '../images/meter.png'; // Import the image
import Arrow from '../images/Arrow.png'; // Import the icon
import MenuIcon from '../images/menu.png'; // Import the menu icon

const Land = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="container">
      {/* Header Section */}
      <header className="header">
        <div className="logo">MetroniQ</div>
        <img src={MenuIcon} alt="Menu Icon" className="menu-icon" onClick={toggleMenu} />
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <a href="#">Products</a>
          <a href="#">About us</a>
          <a href="#">App</a>
          <a href="#">FAQ</a>
        </nav>
      </header>

      {/* Main Section */}
      <main className="main">
        {/* Left Section */}
        <section className="left">
          <h1>
            Our first step towards <span className="highlight">sustainability</span>
          </h1>
          <p>Know more about our smart meters and smart plugs</p>
        </section>

        {/* Right Section */}
        <aside className="right">
          <div className="eb-access">
            <h2>EB access</h2>
            <p>Manage smart meter connections effortlessly</p>
            <Link to="/dashboard" className="arrow-link">
              <img src={Arrow} alt="Arrow Icon" /> {/* Use the imported icon */}
            </Link>
          </div>
          <div className="contact-box">
            <h2>Contact us</h2>
            <p>Have some questions?</p>
            <Link to="/dashboard" className="arrow-link">
              <img src={Arrow} alt="Arrow Icon" /> {/* Use the imported icon */}
            </Link>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Land;