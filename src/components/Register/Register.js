import { React } from 'react';
import { Link } from 'react-router-dom';

import './Register.css';
import { HeaderLogo } from '../../utils/utils';

function Register({ isLogged }) {
  return (
    <main className="register">
      {isLogged ? (
        <Link
          to="/"
          className="register__logo__wrapper"
        >
          <img
            src={HeaderLogo}
            alt="logo"
            className="register__logo-hover"
          />
        </Link>
      ) : (
        <img
          src={HeaderLogo}
          alt="logo"
          className="register__logo__wrapper"
        />
      )}

      <h1 className="register__title">
        Добро пожаловать!
      </h1>

      <form className="register__form" name="register-form">
        <p className="register__input-name">Имя</p>
        <input
          type="text"
          required
          className="register__input"
          name="register-input-text"
        />
        <span className="register__input-error">
          Что-то пошло не так...
        </span>

        <p className="register__input-name">E-mail</p>
        <input
          type="email"
          required
          autoComplete="on"
          className="register__input"
          name="register-input-email"
        />
        <span className="register__input-error">
          Что-то пошло не так...
        </span>

        <p className="register__input-name">Пароль</p>
        <input
          type="password"
          required
          autoComplete="on"
          className="register__input"
          name="register-input-password"
        />
        <span className="register__input-error">
          Что-то пошло не так...
        </span>

        <button type="submit" className="register__button-submit">
          Зарегистрироваться
        </button>
      </form>

      <div className="register__container">
        <p className="register__subtitle">
          Уже зарегистрированы?
        </p>

        <Link
          to="/signin"
          className="register__link"
        >
          Войти
        </Link>

      </div>
    </main>
  );
}

export default Register;
