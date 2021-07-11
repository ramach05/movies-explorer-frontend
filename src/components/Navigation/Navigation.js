import { React } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAppContext } from '../../utils/AppContext';

import './Navigation.css';

function Navigation({ isOpenNavigation, setIsOpenNavigation, handleClosePopup }) {
  const { isLogged, setIsLogged } = useAppContext();
  const history = useHistory();

  function handleNavigationLink() {
    setIsOpenNavigation(false);
    window.removeEventListener('keydown', handleClosePopup);
  }

  function handleAccountButton() {
    history.push('/profile');
    handleNavigationLink();
  }

  if (!isLogged) {
    return null;
  }
  return (
    <aside
      className={!isOpenNavigation ? 'navigation' : 'navigation navigation_open'}
      onClick={handleClosePopup}
    >
      <div className="navigation__container">
        <button
          type="button"
          className="navigation__close-button"
          onClick={handleClosePopup}
        >
        </button>

        <nav className="navigation__nav">
          <ul className="navigation__link-container">
            <li className="navigation__link-wrapper">
              <Link
                to="/"
                className="navigation__link"
                onClick={handleNavigationLink}
              >
                Главная
              </Link>
            </li>
            <li className="navigation__link-wrapper">
              <Link
                to="/movies"
                className="navigation__link"
                onClick={handleNavigationLink}
              >
                Фильмы
              </Link>
            </li>
            <li className="navigation__link-wrapper">
              <Link
                to="/saved-movies"
                className="navigation__link"
                onClick={handleNavigationLink}
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
