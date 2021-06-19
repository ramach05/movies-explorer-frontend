import { React } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import './Navigation.css';

function Navigation({ isOpenNavigation, setIsOpenNavigation, menuRoute }) {
  const history = useHistory();

  const handleCloseNavigation = () => {
    setIsOpenNavigation(false);
  };

  const handleAccountButton = () => {
    history.push('/profile');
    setIsOpenNavigation(false);
  };

  if (!menuRoute) { return null; }
  return (
    <aside className={!isOpenNavigation ? 'navigation' : 'navigation navigation_open'}>
      <div className="navigation__container">
        <button
          type="button"
          className="navigation__close-button"
          onClick={handleCloseNavigation}
        >
        </button>

        <nav className="navigation__nav">
          <ul className="navigation__link-container">
            <li className="navigation__link-wrapper">
              <Link
                to="/"
                className="navigation__link"
                onClick={handleCloseNavigation}
              >
                Главная
              </Link>
            </li>
            <li className="navigation__link-wrapper">
              <Link
                to="/movies"
                className="navigation__link"
                onClick={handleCloseNavigation}
              >
                Фильмы
              </Link>
            </li>
            <li className="navigation__link-wrapper">
              <Link
                to="/saved-movies"
                onClick={handleCloseNavigation}
                className="navigation__link"
              >
                Сохранённые фильмы
              </Link>
            </li>
          </ul>

          <button
            type="button"
            className="navigation__account-button"
            onClick={handleAccountButton}
          >
            <p className="navigation__account-button__text">Аккаунт</p>
            <div className="navigation__account-button__logo"></div>
          </button>
        </nav>
      </div>
    </aside>
  );
}

export default Navigation;
