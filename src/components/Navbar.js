import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [loginState, setLoginState] = React.useState(null);
  let location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setLoginState(true);
    } else {
      setLoginState(false);
    }
  }, [location]);

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userid');
    navigate('/');
  };
  return (
    <nav className="navbar has-background-black">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item has-text-white">
          Home
        </Link>
        <Link to="/cards" className="navbar-item has-text-white">
          Card Index
        </Link>
        {loginState && (
          <>
            <Link to="/create" className="navbar-item has-text-white">
              Add card
            </Link>
            <Link to="/play" className="navbar-item has-text-white">
              Play
            </Link>
          </>
        )}
      </div>
      <div className="navbar-end">
        {!loginState ? (
          <>
            <Link to="/login" className="navbar-item has-text-white">
              Login
            </Link>
            <Link to="/register" className="navbar-item has-text-white">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="#"
              className="navbar-item has-text-white"
              onClick={logout}
            >
              Logout
            </Link>
            {
              <Link to="/profile" className="navbar-item has-text-white">
                {sessionStorage.getItem('username')}
              </Link>
            }
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
