import { Link, useHistory } from 'react-router-dom';
import { React } from 'react';

import './Header.css';
import { HeaderLogo } from '../../utils/utils';

function Header({ setIsOpenNavigation, menuRoute }) {
  const history = useHistory();

  function handleHeaderButton() {
    history.push('/signin');
  }
  function handleBurger() {
    setIsOpenNavigation(true);
  }

  return (
    <div className={!menuRoute ? 'header' : 'header header__burger-bg'}>
      <Link to="/">
        <img src={HeaderLogo} alt="logo" className="header__logo" />
      </Link>

      <nav className="header__nav">
        {!menuRoute ? (
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
