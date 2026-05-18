import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Structured Links Grid */}
      <div className="footer-links">
        <div className="footer-col">
          <h4>Get to Know Us</h4>
          <ul>
            <li>Careers</li>
            <li>About ShoppingCart</li>
            <li>Investor Relations</li>
            <li>Press Center</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Connect with Us</h4>
          <ul>
            <li>Facebook</li>
            <li>Twitter / X</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Make Money with Us</h4>
          <ul>
            <li>Sell on ShoppingCart</li>
            <li>Protect & Build Your Brand</li>
            <li>Become an Affiliate</li>
            <li>Advertise Your Products</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>ShoppingCart Care</h4>
          <ul>
            <li>Your Account</li>
            <li>Your Orders</li>
            <li>Shipping Rates & Policies</li>
            <li>Help & Support Center</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2026 ShoppingCart E-Commerce. Built by Junior Web Developer for demo purposes. No real transactions.</p>
      </div>
    </footer>
  );
};

export default Footer;
