import React from 'react';// Import User AuthContext
import './css/ANavBar.css';
function NewNavBar() {
  
  return (
    <nav className="navbar">
      {/* Brand Logo */}
      <a href="/" className="brand-logo">Chandra Textile</a>

      {/* Hamburger Menu for Mobile */}
      <input type="checkbox" id="menu-toggle" />
      <label htmlFor="menu-toggle" className="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </label>

      {/* Navigation Links */}
      <div className="nav-links">
        <ul>
          
          
          <li><a href="/login">Login</a></li>
          <li><a href="/SignUp">Register</a></li>
          
        </ul>
    </div>
    </nav>
  );
}

export default NewNavBar