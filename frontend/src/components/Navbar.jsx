import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  let navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Guild-Spot</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>
                <small>Logged in:</small>
                {user.email}
              </span>
              <button onClick={handleClick}>Logout</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
