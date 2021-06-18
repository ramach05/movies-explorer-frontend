import { Link, useHistory, useLocation } from 'react-router-dom';
// import { useHistory } from "react-router";

import { React } from 'react';
import './Header.css';

import HederLogo from '../../images/svg/header-logo.svg';

function Header({ setIsOpenNavigation }) {
  const history = useHistory();
  const location = useLocation();

  const burgerMenuRoute = ['/movies', '/saved-movies', '/profile'].includes(location.pathname);

  function handleHeaderButton() {
    history.push('/signin');
  }
  function handleBurger() {
    setIsOpenNavigation(true);
  }

  return (
    <div className="header">
      <Link to="/">
        <img src={HederLogo} alt="logo" className="header__logo" />
      </Link>
      <nav className="header__nav">
        {!burgerMenuRoute ? (
          <>
            <Link to="/signup" className="header__link">
              Регистрация
            </Link>
            <button
              type="button"
              className="header__button"
              onClick={handleHeaderButton}
            >
              Войти
            </button>
          </>
        ) : (
          <button
            type="button"
            className="header__burger"
            aria-label="header-burger-button"
            onClick={handleBurger}
          >
          </button>
        )}
      </nav>
    </div>
  );
}

export default Header;
