import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
  <img src="/assets/logo.png" alt="Logo" width="50" className="logo" />
  <Link to="/">Home</Link> {" "}
  <Link to="/about">About Me</Link> {" "}
  <Link to="/projects">Projects</Link> {" "}
  <Link to="/services">Services</Link> {" "}
  <Link to="/contact">Contact Me</Link>
</nav>

  );
}

export default Navbar;
