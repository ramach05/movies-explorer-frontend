import { React } from 'react';

import './Profile.css';

function Profile() {
  return (
    <main className="profile">
      <h1 className="profile__title">Привет, Роман!</h1>

      <form className="profile__form">
        <ul className="profile__ul">
          <li className="profile__li">
            <input
              type="text"
              id="person-name"
              name="person-name"
              className="profile__input"
            />
            <label htmlFor="person-name" className="profile__input__label">Имя</label>
          </li>
          <li className="profile__li">
            <input
              type="email"
              className="profile__input"
            />
            <label htmlFor="person-name" className="profile__input__label">E-mail</label>
          </li>
        </ul>
        <button type="submit" className="profile__form-submit">Редактировать</button>
      </form>

      <button type="button" className="profile__exit-button">Выйти из аккаунта</button>
    </main>
  );
}

export default Profile;
