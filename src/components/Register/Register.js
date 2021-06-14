import { React } from 'react';
import { Link } from 'react-router-dom';

import './Register.css';
import { HeaderLogo } from '../../utils/utils';

function Register() {
  return (
    <section className="register">
      <img src={HeaderLogo} alt="logo" className="register__logo" />
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form">
        <input className="register__input" />
        <input className="register__input" />
        <input className="register__input" />
        <button type="submit" className="register__button-submit">Зарегистрироваться</button>
      </form>
      <p className="register__subtitle">Уже зарегистрированы?</p>
      <Link to="/signin" className="register__link">
        Войти
      </Link>
    </section>
  );
}

export default Register;
