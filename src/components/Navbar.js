import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

function Navbar() {
  const navigate = useNavigate();
  const { user, signout } = useContext(AuthContext); 

  const handleLogout = () => {
    signout();
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <img src="/assets/logo.png" alt="Logo" width="50" className="logo" />
      <Link to="/">Home</Link>{" "}
      <Link to="/about">About Me</Link>{" "}
      <Link to="/projects">Projects</Link>{" "}
      <Link to="/services">Services</Link>{" "}
      <Link to="/contact">Contact Me</Link>{" "}
      <Link to="/qualifications">Education</Link>
      {!user ? (
        <>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      ) : (
        <>
          {user.role === "admin" && <Link to="/admin">Admin</Link>}
          <span style={{ marginLeft: "10px" }}>
            Hello, {user.name} |
            <button onClick={handleLogout} style={{ marginLeft: "5px" }}>
              Sign Out
            </button>
          </span>
        </>
      )}
    </nav>
  );
}

export default Navbar;
