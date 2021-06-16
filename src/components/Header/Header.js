import { Link, useHistory } from 'react-router-dom';
// import { useHistory } from "react-router";

import { React } from 'react';
import './Header.css';

import HederLogo from '../../images/svg/header-logo.svg';

function Header() {
  const history = useHistory();

  function handleHeaderLogo() {
  }

  function handleHeaderLink() {
  }

  function handleHeaderButton() {
    history.push('/signin');
  }

  return (
    <div className="header">
      <Link to="/">
        <img src={HederLogo} alt="logo" className="header__logo" />
      </Link>
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
    </div>
  );
}

export default Header;
