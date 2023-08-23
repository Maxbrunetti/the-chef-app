import { Link } from 'react-router-dom';
import './../../styles/Navbar.css';
import { useState } from 'react';

function Navbar({ title }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      <div className={`navbar ${menuOpen ? 'active' : ''}`}>
        <div
          className={`hamburger-icon ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <p className="title">{title}</p>
      </div>
      <ul className={`nav-elements ${menuOpen ? 'active' : 'hidden'}`}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/order">Order</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
