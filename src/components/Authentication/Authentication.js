import { React } from 'react';
import { Link } from 'react-router-dom';

import './Authentication.css';
import { HeaderLogo } from '../../utils/utils';

function Authentication({ isLoginRoute, isRegisterRoute }) {
  return (
    <section className="authentication">

      <img src={HeaderLogo} alt="logo" className="authentication__logo" />

      <h1 className="authentication__title">
        {isRegisterRoute ? 'Добро пожаловать!' : 'Рады видеть!'}
      </h1>

      <form className="authentication__form" name="register-form">
        <input
          type="text"
          className="authentication__input"
          name="register-input-text"
        />
        <input
          type="email"
          className="authentication__input"
          name="register-input-email"
        />
        {isRegisterRoute ? (
          <input
            type="password"
            className="authentication__input"
            name="register-input-password"
          />
        ) : null}
        <button type="submit" className="authentication__button-submit">
          {isRegisterRoute ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </form>

      <p className="authentication__subtitle">
        {isRegisterRoute ? 'Уже зарегистрированы?' : 'Ещё не зарегистрированы?'}
      </p>

      {isRegisterRoute ? (
        <Link to="/signin" className="authentication__link">
          Войти
        </Link>
      ) : (
        <Link to="/signup" className="authentication__link">
          Регистрация
        </Link>
      )}
    </section>
  );
}

export default Authentication;
