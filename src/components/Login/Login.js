import { React } from 'react';
import { Link } from 'react-router-dom';

import './Login.css';
import HederLogo from '../../images/svg/header-logo.svg';

function Login() {
  return (
    <section className="login">
      <img src={HederLogo} alt="logo" className="login__logo" />
      <h1>Рады видеть!</h1>
      <form>
        <input />
        <input />
        <button type="submit">Войти</button>
      </form>
      <p>Ещё не зарегистрированы?</p>
      <Link to="/signup" className="">
        Регистрация
      </Link>
    </section>
  );
}

export default Login;
