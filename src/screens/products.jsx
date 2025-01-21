import React from "react";
import './products.css'; // Ensure you have a CSS file for styling

const Products = () => {
  return (
    <div className="portfolio-container">
      <header className="portfolio-header">
        <h1 className="portfolio-title">Our Products</h1>
      </header>
      <div className="portfolio-grid">
        <div className="portfolio-item">
          <h2 className="portfolio-item-title">MetroniQ App</h2>
          <p className="portfolio-item-description">Manage your smart meters and smart plugs with our intuitive app.</p>
        </div>
        <div className="portfolio-item">
          <h2 className="portfolio-item-title">MetroniQ Website</h2>
          <p className="portfolio-item-description">Explore our website to learn more about our products and services.</p>
        </div>
      </div>
    </div>
  );
};

export default Products;