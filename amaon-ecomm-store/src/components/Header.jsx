import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { totalItems } = useContext(CartContext);
  const { user, login, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  // Handle Search Submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/products');
    }
  };

  // Simulated login trigger via a quick browser prompt
  const handleAuthClick = () => {
    if (user.isLoggedIn) {
      if (window.confirm("Are you sure you want to sign out from ShoppingCart?")) {
        logout();
        navigate('/');
      }
    } else {
      const username = window.prompt("Welcome to ShoppingCart! Enter a username to access checkout:");
      if (username !== null) {
        login(username);
      }
    }
  };

  // Helper to determine if a category subheader link is active
  const isCategoryActive = (category) => {
    const params = new URLSearchParams(location.search);
    return location.pathname === '/products' && params.get('category') === category;
  };

  return (
    <header className="header">
      {/* Top Bar */}
      <div className="header-top">
        {/* Logo */}
        <Link to="/" className="header-logo" onClick={() => setSearchQuery('')}>
          ShoppingCart
        </Link>

        {/* Location Block */}
        <div className="header-location" onClick={() => alert("Express shipping configurations are mock-only for this demo!")}>
          <span className="header-location-title">Ship to</span>
          <span className="header-location-name">📍 Enter location</span>
        </div>

        {/* Search Form */}
        <form className="header-search-container" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="header-search-input"
            placeholder="Search products, categories, journals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="header-search-btn">
            Search
          </button>
        </form>

        {/* Navigations */}
        <div className="header-nav">
          {/* Auth Button */}
          <div className="header-nav-link" onClick={handleAuthClick}>
            <span className="header-nav-link-small">Hello, {user.name}</span>
            <span className="header-nav-link-bold">
              {user.isLoggedIn ? 'Sign Out' : 'Sign In'}
            </span>
          </div>

          {/* Static Orders Link */}
          <div className="header-nav-link" onClick={() => alert("Orders tracking requires a real database! Add items to cart to place a mock order.")}>
            <span className="header-nav-link-small">Returns</span>
            <span className="header-nav-link-bold">& Tracking</span>
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="header-cart-icon">
            <span style={{ fontSize: '20px' }}>🛒</span>
            <span className="header-cart-count">{totalItems}</span>
            <span className="header-cart-text">Cart</span>
          </Link>
        </div>
      </div>

      {/* Sub Header / Category Bar */}
      <div className="subheader">
        <Link
          to="/products"
          className={`subheader-link ${location.pathname === '/products' && !location.search ? 'active' : ''}`}
          onClick={() => setSearchQuery('')}
        >
          All Collections
        </Link>
        <Link
          to="/products?category=electronics"
          className={`subheader-link ${isCategoryActive('electronics') ? 'active' : ''}`}
          onClick={() => setSearchQuery('')}
        >
          Electronics
        </Link>
        <Link
          to="/products?category=fashion"
          className={`subheader-link ${isCategoryActive('fashion') ? 'active' : ''}`}
          onClick={() => setSearchQuery('')}
        >
          Fashion
        </Link>
        <Link
          to="/products?category=home"
          className={`subheader-link ${isCategoryActive('home') ? 'active' : ''}`}
          onClick={() => setSearchQuery('')}
        >
          Home & Living
        </Link>
        <Link
          to="/products?category=books"
          className={`subheader-link ${isCategoryActive('books') ? 'active' : ''}`}
          onClick={() => setSearchQuery('')}
        >
          Books
        </Link>
        <Link
          to="/products?category=fitness"
          className={`subheader-link ${isCategoryActive('fitness') ? 'active' : ''}`}
          onClick={() => setSearchQuery('')}
        >
          Fitness
        </Link>
      </div>
    </header>
  );
};

export default Header;
