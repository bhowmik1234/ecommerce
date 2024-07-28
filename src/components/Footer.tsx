import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP } from 'react-icons/fa';
// import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__section">
          <h3 className="footer__title">Shop</h3>
          <ul className="footer__list">
            <li><a href="/new-arrivals">New Arrivals</a></li>
            <li><a href="/bestsellers">Bestsellers</a></li>
            <li><a href="/sale">Sale</a></li>
            <li><a href="/collections">Collections</a></li>
          </ul>
        </div>
        <div className="footer__section">
          <h3 className="footer__title">Customer Service</h3>
          <ul className="footer__list">
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/shipping">Shipping & Returns</a></li>
            <li><a href="/size-guide">Size Guide</a></li>
          </ul>
        </div>
        <div className="footer__section">
          <h3 className="footer__title">About Us</h3>
          <ul className="footer__list">
            <li><a href="/our-story">Our Story</a></li>
            <li><a href="/sustainability">Sustainability</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/press">Press</a></li>
          </ul>
        </div>
        <div className="footer__section footer__newsletter">
          <h3 className="footer__title">Stay Connected</h3>
          <p>Subscribe to our newsletter for exclusive offers and updates</p>
          <form className="footer__form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
          <div className="footer__social">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Pinterest"><FaPinterestP /></a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; 2024 Your E-commerce Store. All rights reserved.</p>
        <ul className="footer__legal">
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms-of-service">Terms of Service</a></li>
          <li><a href="/accessibility">Accessibility</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;