import { React } from 'react';
import { Link } from 'react-router-dom';

import './Navigation.css';

function Navigation() {
  const handleCloseNavigation = () => { };

  const handleAccountButton = () => {};

  return (
    <article className="navigation">
      <div className="navigation__container">
        <button
          type="button"
        // className="navigation__close-button"
          onClick={handleCloseNavigation}
        >
          424242
        </button>

        <nav>
          <ul className="navigation__link-wrapper">
            <li>
              <Link to="/" className="navigation__link">
                Назад
              </Link>
            </li>
            <li>
              <Link to="/" className="navigation__link">
                Назад
              </Link>
            </li>
            <li>
              <Link to="/" className="navigation__link">
                Назад
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
    </article>

  );
}

export default Navigation;
