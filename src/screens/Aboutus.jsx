import React from 'react';
import './Aboutus.css';
import  ashly from'../images/ashly.jpeg';
import abhinand from'../images/abhinand.jpg';
import anjana from'../images/anjana.jpg';
import aadarsh from'../images/aadarsh.jpg';
const AboutUs = () => {
  return (
    <div>
      <div className="about-section">
      <h1>
            Smart energy monitoring for a  <span className="highlight">sustainable future</span>
          </h1>
        <p>We are a team of passionate individuals committed to delivering the best services to our clients.
             Our mission is to provide innovative solutions that meet the needs of our customers and exceed their expectations.
              With years of experience in the industry, we pride ourselves on our professionalism, expertise, and dedication to excellence.
        </p>
      </div>

      <h2 id="our-team" style={{ textAlign: 'center' }}>Our Team</h2>      <div className="row">
        <div className="column">
          <div className="card">
          <img src={ashly} alt="Ashly" style={{ width: '100%' }} />
        <div className="container">
              <h2>Ashly Biju</h2>
              <p className="title">Web Developer</p>
              <p>ashly.csa2125@saintgits.org</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
          <img src={abhinand} alt="Abhinand" style={{ width: '100%' }} />
            <div className="container">
              <h2>Abhinand M</h2>
              <p className="title">App Developer</p>
              <p>abhinand.csa2125@saintgits.org</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
          <img src={anjana} alt="Anjana" style={{ width: '100%' }} />
            <div className="container">
              <h2>Anjana Vinod</h2>
              <p className="title">Web Developer</p>
              <p>av.csa2125@saintgits.org</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
          <img src={aadarsh} alt="Aadarsh" style={{ width: '100%' }} />
            <div className="container">
              <h2>Aadarsh Rajesh Kumar</h2>
              <p className="title">Designer</p>
              <p>aadarsh.csa2125@saintgits.org</p>
              <p><button className="button">Contact</button></p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;