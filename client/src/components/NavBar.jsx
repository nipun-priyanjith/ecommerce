


import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Import User AuthContext
import './css/ANavBar.css';

function NavBar() {
  const { user, logout } = useContext(AuthContext); // Get user context

  return (
    <nav className="navbar">
      {/* Brand Logo */}
      <a href="http://localhost:3000/" className="brand-logo">Chandra Textile</a>

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
          <li><a href="/">Home</a></li>
         
          <li><a href="/myorder">Orders</a></li>
          <li><a href="/user">My Account</a></li>
          <li><a href="/cart">Cart</a></li>
        </ul>

        {/* User Sign-Out Button */}
        {user && (
          <button onClick={logout} className="sign-out-btn">
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
