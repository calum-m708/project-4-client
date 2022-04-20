import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          Home
        </Link>
        <Link to="/cards" className="navbar-item">
          Card Index
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
