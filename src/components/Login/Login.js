import { React } from 'react';
import { Link } from 'react-router-dom';

import { HeaderLogo } from '../../utils/utils';

function Login({ isLogged }) {
  function handleSubmit() {
  }

  return (
    <main className="register">
      {isLogged ? (
        <Link
          to="/"
          className="register__logo-wrapper"
        >
          <img
            src={HeaderLogo}
            alt="logo"
            className="register__logo-link"
          />
        </Link>
      ) : (
        <img
          src={HeaderLogo}
          alt="logo"
          className="register__logo-wrapper"
        />
      )}

      <h1 className="register__title">
        Рады видеть!
      </h1>

      <form className="register__form" onSubmit={handleSubmit}>
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
          Войти
        </button>
      </form>

      <div className="register__container">
        <p className="register__subtitle">
          Ещё не зарегистрированы?
        </p>

        <Link
          to="/signup"
          className="register__link"
        >
          Регистрация
        </Link>

      </div>
    </main>
  );
}

export default Login;
