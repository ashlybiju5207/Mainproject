import React from 'react';
import './Aboutus.css';
import ashly from '../images/ashly.jpeg';
import abhinand from '../images/abhinand.jpg';
import anjana from '../images/anjana.jpg';
import aadarsh from '../images/aadarsh.jpg';
import missionImage from '../images/mission.png';
import visionImage from '../images/vision.png';

const AboutUs = () => {
  return (
    <div className="about-container">
      <header className="header-section">
        <h1>
          Smart energy monitoring for a{' '}
          <span className="highlight">sustainable future</span>
        </h1>
        <p>
          We are committed to providing innovative solutions for efficient energy monitoring and management.
        </p>
      </header>

      <h2 id="our-team">Our Team</h2>
      <div className="team-row">
        <div className="team-column">
          <div className="team-card">
            <div className="profile-image">
              <img src={ashly} alt="Ashly" />
            </div>
            <div className="member-info">
              <h2>Ashly Biju</h2>
              <p className="title">Web Developer</p>
              <p>ashly.csa2125@saintgits.org</p>
              <button className="contact-btn">Contact</button>
            </div>
          </div>
        </div>

        <div className="team-column">
          <div className="team-card">
            <div className="profile-image">
              <img src={abhinand} alt="Abhinand M" />
            </div>
            <div className="member-info">
              <h2>Abhinand M</h2>
              <p className="title">App Developer</p>
              <p>abhinand.csa2125@saintgits.org</p>
              <button className="contact-btn">Contact</button>
            </div>
          </div>
        </div>

        <div className="team-column">
          <div className="team-card">
            <div className="profile-image">
              <img src={anjana} alt="Anjana" />
            </div>
            <div className="member-info">
              <h2>Anjana Vinod</h2>
              <p className="title">Web Developer</p>
              <p>av.csa2125@saintgits.org</p>
              <button className="contact-btn">Contact</button>
            </div>
          </div>
        </div>

        <div className="team-column">
          <div className="team-card">
            <div className="profile-image">
              <img src={aadarsh} alt="Aadarsh" />
            </div>
            <div className="member-info">
              <h2>Aadarsh Rajesh</h2>
              <p className="title">Web Developer</p>
              <p>aadarsh.csa2125@saintgits.org</p>
              <button className="contact-btn">Contact</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mission-vision-section">
<<<<<<< HEAD
        <div className="team-row">
          <div className="team-column">
            <div className="team-card">
              <div className="profile-image">
                <img src={missionImage} alt="Our Mission" />
              </div>
              <div className="member-infom">
                <h2>Our Mission</h2>
                <p className="title">Purpose Driven Solutions</p>
                <p id='exp'>To revolutionize energy monitoring through innovative technology, making sustainable energy management accessible and efficient for everyone.</p>
              </div>
            </div>
          </div>

          <div className="team-column">
            <div className="team-card">
              <div className="profile-image">
                <img src={visionImage} alt="Our Vision" />
              </div>
              <div className="member-infom">
                <h2>Our Vision</h2>
                <p className="title">Future Forward</p>
                <p id='exp'>To be the global leader in smart energy solutions, driving the transition towards a more sustainable and energy-efficient future.</p>
              </div>
=======
        <div className="mission-vision-row">
          <div className="mission-vision-card">
            <div className="profile-image">
              <img src={missionImage} alt="Our Mission" />
            </div>
            <div className="member-info">
              <h2>Our Mission</h2>
              <p className="title">Purpose Driven Solutions</p>
              <p id='exp'>To revolutionize energy monitoring through cutting-edge technology and innovative solutions, empowering individuals and organizations to achieve sustainable energy management with unparalleled efficiency, accessibility, and environmental responsibility.</p>
            </div>
          </div>

          <div className="mission-vision-card">
            <div className="profile-image">
              <img src={visionImage} alt="Our Vision" />
            </div>
            <div className="member-info">
              <h2>Our Vision</h2>
              <p className="title">Future Forward</p>
              <p id='exp'>To become the global leader in smart energy solutions, driving a sustainable and energy-efficient future by leveraging advanced technology, fostering innovation, and empowering individuals and businesses to adopt smarter energy practices.</p>
>>>>>>> cb21d1e730cd753a368542462db28aaa288d6edb
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} All Rights Reserved by MetroniQ</p>
      </footer>
    </div>
  );
};

export default AboutUs;