import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { credentials } from '../api/auth';

const Navbar = () => {
  const [loginState, setLoginState] = React.useState(null);
  let location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setUser] = React.useState(null);

  React.useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setLoginState(true);
    } else {
      setLoginState(false);
    }
  }, [location]);

  React.useEffect(() => {
    const token = sessionStorage.getItem('token');
    const getData = async () => {
      try {
        const data = await credentials(token);
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
    console.log('working');
  }, []);

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
            {currentUser && (
              <Link to="/profile" className="navbar-item">
                {currentUser.username}
              </Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
