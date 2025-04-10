import React, { useContext } from 'react';
import { AdminAuthContext } from '../context/AdminAuthContext'; // Import AdminAuthContext
//import './css/AdminNavBar.css'; 
import './css/ANavBar.css';
function ANavBar() {
  const { admin, adminLogout } = useContext(AdminAuthContext); // Get admin context

  return (
    <nav className="navbar">
      {/* Left: Brand Logo */}
      <a href="http://localhost:3000/admin" className="brand-logo">Chandra Textile</a>
      {/* Hamburger Menu for Mobile */}
      <input type="checkbox" id="menu-toggle" />
      <label htmlFor="menu-toggle" className="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </label>
      {/* Right: Navigation Links and Admin Sign-Out Button */}
      <div className="nav-links">
        <ul>
         
          <li><a href="/aorders">Orders</a></li>
          <li><a href="/inventary">Inventory M</a></li>
          <li><a href="/management">Management</a></li>
          
          {/* <li><a href="/auser">User</a></li> */}
          {/* <li><a href="/#">OHistory</a></li>
          <li><a href="/#">USHistory</a></li>
          <li><a href="/#">Best-5</a></li> */}

          {/* <li><a href="/alogin">ALogin</a></li> */}
          {/* <li><a href="/aregister">ARegister</a></li> */}

          <li>
        {admin && (
          <button onClick={adminLogout} className="sign-out-btn">
            Admin Sign Out
          </button>
        )}</li></ul>
      </div>
    </nav>
  );
}
export default ANavBar ;



