import React from "react";
import "./footer.css";
import { FaTwitter, FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="https://svgshare.com/i/17WS.svg" alt="App Logo" />
        </div>
        <div className="footer-links">
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="/help">Help Center</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/terms">Terms of Use</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" className="social-icon"><FaFacebook /></a>
            <a href="https://twitter.com" className="social-icon"><FaTwitter /></a>
            <a href="https://instagram.com" className="social-icon"><FaInstagram /></a>
            <a href="https://youtube.com" className="social-icon"><FaYoutube /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; Sinethemba Zulu & Mthokozisi Dlamini. All Rights Reserved.</p>
        <div className="ourLinks">
          <div>
            <h4>Sinethemba</h4>
          <a href="https://github.com/Gracepinkie" className="social-icon"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/sinethemba-zulu/" className="social-icon"><FaLinkedin /></a>
          </div>
          <div>
            <h4>Mthokozisi</h4>
            <a href="https://www.github.com/sthabiso-iv" className="social-icon"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/sthabiso" className="social-icon"><FaLinkedin /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
