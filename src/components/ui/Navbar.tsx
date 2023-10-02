import { Link } from 'react-router-dom';
import './../../styles/Navbar.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
  const list = useSelector(
    state => state.recipes.lists[state.recipes.currentList]
  );
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  function setTitle() {
    if (location.pathname === '/order') {
      return list;
    }
    if (location.pathname === '/') {
      return 'THE CHEF APP';
    }
    if (location.pathname === '/recipes') {
      return 'RECIPES';
    }
    if (location.pathname === '/addrecipes') {
      return 'ADD RECIPES';
    } else return 'THE CHEF APP';
  }

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
        <p className="title">{setTitle().toUpperCase()}</p>
      </div>
      <ul className={`nav-elements ${menuOpen ? 'active' : 'hidden'}`}>
        <li>
          <Link to="/" onClick={toggleMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/order" onClick={toggleMenu}>
            Order
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
