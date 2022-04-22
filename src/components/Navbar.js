import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getLoggedInUserId } from '../lib/auth';

const Navbar = () => {
  const [loginState, setLoginState] = useState(getLoggedInUserId());
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoginState(getLoggedInUserId());
    console.log('login state is:', loginState);
  }, [location]);

  const logout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          Home
        </Link>
        <Link to="/cards" className="navbar-item">
          Card Index
        </Link>
        {loginState && (
          <Link to="/create" className="navbar-item">
            Add card
          </Link>
        )}
      </div>
      <div className="navbar-end">
        {!loginState ? (
          <>
            <Link to="/login" className="navbar-item">
              Login
            </Link>
            <Link to="/register" className="navbar-item">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="#" className="navbar-item" onClick={logout}>
              Logout
            </Link>
            <Link to="/profile" className="navbar-item">
              {loginState.username}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
