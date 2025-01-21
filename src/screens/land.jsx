import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './land.css';
import MeteroniQlogo from '../images/MeteroniQlogo.png'; // Import the image
import Arrow from '../images/Arrow.png'; // Import the icon
import MenuIcon from '../images/menu.png'; // Import the menu icon

const Land = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();
    (function() {
      var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/678734043a842732606ef7b9/1ihk2ib7b';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  return (
    <div className="container">
      {/* Header Section */}
      <header className="header">
        <img src={MeteroniQlogo} alt="MeteroniQ Logo" className="logo-image" /> {/* Use the imported image */}
        <div className="logo">MetroniQ</div>
        <img src={MenuIcon} alt="Menu Icon" className="menu-icon" onClick={toggleMenu} />
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <Link to="/products">Products</Link> {/* Ensure this directs to Products.jsx */}
          <Link to="/aboutus">About us</Link>
          <Link to="/faq">FAQ</Link>
        </nav>
      </header>

      {/* Main Section */}
      <main className="main">
        {/* Left Section */}
        <section className="left">
          <h1>
            Our first step<br /> towards<br /> <span className="highlight">sustainability</span>
          </h1>
          <p>Know more about our smart meters and smart plugs</p>
        </section>

        {/* Right Section */}
        <aside className="right">
          <div className="eb-access">
            <h2>EB access</h2>
            <p>Manage smart meter connections effortlessly</p>
            <Link to="/login" className="arrow-link">
              <img src={Arrow} alt="Arrow Icon" /> {/* Use the imported icon */}
            </Link>
          </div>
          <div className="contact-box">
            <h2>Contact us</h2>
            <p>Have some questions?</p>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=kseby@example.com" className="arrow-link" target="_blank" rel="noopener noreferrer">
              <img src={Arrow} alt="Arrow Icon" /> {/* Use the imported icon */}
            </a>
          </div>
        </aside>
      </main>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} All Rights Reserved by MetroniQ</p>
      </footer>
    </div>
  );
};

export default Land;