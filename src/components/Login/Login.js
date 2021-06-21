import { React } from 'react';
import { Link } from 'react-router-dom';

import './Login.css';
import { HeaderLogo } from '../../utils/utils';

function Login({ isLogged }) {
  return (
    <main className="login">
      {isLogged ? (
        <Link
          to="/"
          className="login__logo__wrapper"
        >
          <img
            src={HeaderLogo}
            alt="logo"
            className="login__logo-hover"
          />
        </Link>
      ) : (
        <img
          src={HeaderLogo}
          alt="logo"
          className="register__logo__wrapper"
        />
      )}

      <h1 className="login__title">
        Рады видеть!
      </h1>

      <form className="login__form" name="register-form">
        <p className="login__input-name">E-mail</p>
        <input
          type="email"
          required
          autoComplete="on"
          className="login__input"
          name="register-input-email"
        />
        <span className="login__input-error">
          Что-то пошло не так...
        </span>

        <p className="login__input-name">Пароль</p>
        <input
          type="password"
          required
          autoComplete="on"
          className="login__input"
          name="register-input-password"
        />
        <span className="login__input-error">
          Что-то пошло не так...
        </span>

        <button type="submit" className="login__button-submit">
          Войти
        </button>
      </form>

      <div className="login__container">
        <p className="login__subtitle">
          Ещё не зарегистрированы?
        </p>

        <Link
          to="/signup"
          className="login__link"
        >
          Регистрация
        </Link>

      </div>
    </main>
  );
}

export default Login;
